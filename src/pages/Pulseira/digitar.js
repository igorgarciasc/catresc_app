import React, { useState } from "react";
import { Alert, Vibration } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Block, theme, Text, Button } from "galio-framework";
import Header from '../../components/Header'
import Input from '../../components/Input'
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../services/api'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TokenActions from "../../storage/actions/token";
import * as RoomActions from '../../storage/actions/room'

import styles from './styles'

function Digitar({ setToken, setRoom, navigation }) {

	const [inputCode, setInpuCode] = useState('');
	const [spinner, setSpinner] = useState(false);

	const onHandlerSubmit = async ({ type, data }) => {
		setSpinner(true);
		if (inputCode)
		{
			api.post('register', { cod: inputCode }).then(result => {
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
							{ text: 'Tentar novamente', style: 'cancel', onPress: () => { setSpinner(false); } },
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
		}
	};

	return (
		<>
			<Spinner
				visible={spinner}
				textContent={'Solicitando...'}
				textStyle={{ color: '#FFF' }}
			/>
			<Block flex style={{ flexDirection: 'column' }}>

				<Block style={{ marginBottom: theme.SIZES.BASE }}>
					<Header
						title="IDENTIFICAÇÃO"
						navigation={useNavigation}
						bgColor="#F4AE00"
						titleColor="white"
						iconColor="white"
						white={true}

					/>
				</Block>

				<Block style={{ marginTop: 200 }}>

					<Block fluid style={{ paddingHorizontal: 20, marginBottom: 20 }}>
						<Input
							right
							placeholder="Digite o código de sua pulseira"
							type='numeric'
							value={inputCode}
							onChangeText={(value) => setInpuCode(value)}
						/>
					</Block>

					<Block row center >
						<Button
							shadowless
							style={styles.button}
							color="#F4AE00"
							onPress={onHandlerSubmit}
							disabled={inputCode ? false : true}
						>
							<Text
								style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
								color={theme.COLORS.WHITE}
							>
								Enviar
                  				</Text>
						</Button>
					</Block>

				</Block>
			</Block>
		</>
	);
}

const mapStateToProps = (state) => ({
	token: state.token,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(Object.assign(TokenActions, RoomActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Digitar);