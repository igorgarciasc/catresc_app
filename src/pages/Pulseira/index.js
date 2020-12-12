import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Vibration } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from 'react-native-barcode-mask';
import Spinner from 'react-native-loading-spinner-overlay';
import { Block, Button, Text } from "galio-framework";

import { Camera } from 'expo-camera';

import api from '../../services/api'

import { nowTheme } from '../../constants';
import Header from '../../components/Header'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TokenActions from "../../storage/actions/token";
import * as RoomActions from '../../storage/actions/room'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from './modal'

function Pulseira({ navigation, token, room, setToken, setRoom }) {

	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false)
	const [spinner, setSpinner] = useState(false);
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		if (!!token.value && !!room.number) navigation.navigate('DashboardTabs');
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
			setSpinner(false);
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setShowModal(false);

		api.post('app/register', { cod: data }).then(async (result) => {
			const informacoesUsuario = result.data.data;
			setSpinner(false);
			if (!!informacoesUsuario.status)
			{
				try
				{
					Vibration.vibrate(200);
					setToken(informacoesUsuario.token);
					await AsyncStorage.setItem('@appcatreToken', informacoesUsuario.token);
					setRoom(informacoesUsuario.room, informacoesUsuario.chkt)
					await AsyncStorage.setItem('@appcatreRoom', JSON.stringify({ number: informacoesUsuario.room, chkt: informacoesUsuario.chkt }));
					navigation.navigate('DashboardTabs');
				} catch (err)
				{
					console.log(err)
				}
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

	if (hasPermission === null)
	{
		return (<>
			<Header
				title="IDENTIFICAÇÃO"
				navigation={navigation}
				bgColor="#F4AE00"
				logout={false}
				titleColor="white"
				iconColor="white"
				white={true}
			/>
			<Text style={{ fontFamily: 'montserrat-regular', marginTop: 30 }} center muted>
				Estamos aguardando sua permissão :)
			</Text>
			<Block center style={{ marginTop: 550 }} >
				<Button color="#F4AE00" shadowless size='large' onPress={() => setShowModal(!showModal)}>Prefiro Digitar</Button>
			</Block>
		</>)
	}
	else if (hasPermission === false)
	{
		navigation.navigate('Digitar')
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
					navigation={navigation}
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
						<Button color="#F4AE00" shadowless size='large' onPress={() => setShowModal(!showModal)}>Prefiro Digitar</Button>
					</Block>
				</View >
				<Modal show={showModal} setShow={setShowModal} onProcess={handleBarCodeScanned} />
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