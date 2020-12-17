import React, { useEffect } from 'react';
import { Image, StatusBar, Linking } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { nowTheme } from '../../constants/';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from "react-redux";
import * as TokenActions from "../../storage/actions/token";
import * as RoomActions from "../../storage/actions/room"
import { bindActionCreators } from "redux";

import logoSemTexto from '../../../assets/somente_logo.png'
import logoIasd from '../../../assets/logo_iasd.png'

function Onboarding({ navigation, setToken, setRoom }) {

	useEffect(() => {
		(async () => {
			await loadVariables();
		})();
	}, []);

	const loadVariables = async () => {
		const token = await AsyncStorage.getItem('@appcatreToken');
		const room = await AsyncStorage.getItem('@appcatreRoom');
		const roomJson = JSON.parse(room)
		if (token) setToken(token)
		if (room) setRoom(roomJson.number, roomJson.chkt)
		if (token && room)
		{
			navigation.navigate('DashboardTabs')
		}
	}

	const handleClickSite = async () => {
		const supported = await Linking.canOpenURL('http://catre.org.br');
		if (supported)
		{
			await Linking.openURL('http://catre.org.br');
		} else
		{
			Alert.alert('Ops, seu celular não permitir abrir esse endereço, mas entre em seu navegador no endereço catre.org.br e fique por dentro das novidades!');
		}
	}

	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="#ffffff" />
			<Block flex style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingTop: 50, justifyContent: 'center' }}>
				<Block>

					<Block middle>
						<Image source={logoSemTexto} style={{ width: 60, height: 45, top: 0 }} />
					</Block>


					<Block style={{ marginTop: 160 }}>
						<Text center h2 style={{ fontFamily: 'montserrat-bold' }}>Bem-vindo!</Text>
						<Text center h5 style={{ marginTop: -10, fontFamily: 'montserrat-regular' }}>Estamos felizes em tê-lo conosco</Text>
						<Text center muted>Selecione uma das opções abaixo:</Text>
					</Block>

					<Block center style={{ marginBottom: 10, marginTop: 50 }} >
						<Button
							shadowless
							style={{
								backgroundColor: '#42929D',
								width: 230
							}}
							color={nowTheme.COLORS.PRIMARY}
							onPress={() => navigation.navigate("Pulseira")}
						>
							<Text style={{ fontFamily: 'montserrat-bold', fontSize: 14 }} color={theme.COLORS.WHITE}>
								Hóspede
                  				</Text>
						</Button>
					</Block>

					<Block center>
						<Button
							shadowless
							style={{
								backgroundColor: '#F4AE00',
								width: 230
							}}
							onPress={() => navigation.navigate("DashboardTabs")}
						>
							<Text
								style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
								color={theme.COLORS.WHITE}
							>
								Visitante
                  				</Text>
						</Button>
					</Block>

					<Block style={{
						flex: 1,
						flexDirection: 'row',
						position: 'absolute',
						bottom: 15,
						justifyContent: 'space-between',
						alignContent: 'center',
						alignItems: 'center',
						width: '100%'
					}}>
						<Image source={logoIasd} style={{ width: 30, height: 30 }} />
						<Text muted style={{ fontSize: 20 }} onPress={() => { handleClickSite() }}>catre.org.br</Text>
					</Block>




				</Block>
			</Block>
		</>
	);
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(Object.assign(TokenActions, RoomActions), dispatch);

export default connect(null, mapDispatchToProps)(Onboarding);