import React, { useState } from "react";
import { StyleSheet, View, Alert, Vibration, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BarcodeMask from 'react-native-barcode-mask';
import Spinner from 'react-native-loading-spinner-overlay';
import { Block, Button } from "galio-framework";

import { Camera } from 'expo-camera';

import api from '../../services/api'

import { nowTheme } from '../../constants';
import Header from '../../components/Header'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TokenActions from "../../storage/actions/token";
import * as RoomActions from '../../storage/actions/room'

function Pulseira({ token, setToken, setRoom }) {

	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false)
	const [spinner, setSpinner] = useState(false);
	const { navigate } = useNavigation();

	useFocusEffect(() => {
		if (token.value)
		{
			navigate('DashboardTabs')
		}
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
			setSpinner(false);
		})();
	});

	const handleBarCodeScanned = ({ type, data }) => {
		setSpinner(true);
		setScanned(true);

		if (!data)
		{
			navigate('Digitar')
		}

		api.post('app/register', { cod: data }).then(result => {
			setSpinner(false);
			if (result.data.data.status)
			{
				Vibration.vibrate();
				setToken(result.data.data.token);
				setRoom(result.data.data.room, result.data.data.chkt)
				navigation.navigate('DashboardTabs');
			}
			else
			{
				Alert.alert(
					'Ops',
					'Parece que você não está hospedado',
					[
						{ text: 'Tentar novamente', style: 'cancel', onPress: () => { setSpinner(false); setScanned(false) } },
						{ text: 'Ok', onPress: () => { setSpinner(false); navigate('DashboardTabs'); } }
					]
				)
			}
		}).catch(err => {
			Alert.alert(
				'Ops',
				'Aconteceu alguma coisa estranha. Tente novamente.',
				[
					{
						text: 'Ok', onPress: () => {
							setSpinner(false);
						}
					}
				]
			)
		});
	};

	const handleDigitar = () => {
		navigate('Digitar')
	}

	if (hasPermission === null)
	{
		return (<>
			<Header
				title="IDENTIFICAÇÃO"
				navigation={useNavigation}
				bgColor="#F4AE00"
				logout={false}
				titleColor="white"
				iconColor="white"
				white={true}

			/>
			<Text>Solicitando a permissão</Text>

		</>)
	}
	else if (hasPermission === false)
	{
		navigate('Digitar')
	}
	else
	{
		return (
			<>
				<Spinner
					visible={spinner}
					textContent={'Solicitando...'}
					textStyle={{ color: '#FFF' }}
				/>
				<Header
					title="IDENTIFICAÇÃO"
					navigation={useNavigation}
					bgColor="#F4AE00"
					logout={false}
					titleColor="white"
					iconColor="white"
					white={true}

				/>
				<View style={{ flex: 1 }}>
					{!scanned && <Camera onBarCodeScanned={handleBarCodeScanned}
						style={StyleSheet.absoluteFillObject} ratio='16:9'>
						<BarcodeMask width={350} height={100} edgeColor={nowTheme.COLORS.DEFAULT} showAnimatedLine={false} />
					</Camera >}
					<Block center style={{ marginTop: 550 }} >
						<Button color="#F4AE00" shadowless size='large' onPress={handleDigitar}>Prefiro Digitar</Button>
					</Block>
				</View >

			</>
		);
	}
}

const mapStateToProps = (state) => ({
	token: state.token,
	room: state.room
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(Object.assign(TokenActions, RoomActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pulseira);