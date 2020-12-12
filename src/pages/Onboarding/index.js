import React, { useEffect } from 'react';
import { ImageBackground, Image, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Images, nowTheme } from '../../constants/';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from "react-redux";
import * as TokenActions from "../../storage/actions/token";
import * as RoomActions from "../../storage/actions/room"
import { bindActionCreators } from "redux";

import { registerForPushNotifications } from '../../services/pushNotifications'

const { width } = Dimensions.get('screen');
import styles from "./styles";

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

	return (
		<Block flex style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Block flex>
				<ImageBackground source={Images.Onboarding} style={{ flex: 1, height: '100%', width, zIndex: 1 }} />
				<Block space="between" style={styles.padded}>
					<Block>
						<Block middle>
							<Image source={Images.NowLogo} style={{ bottom: 150, position: 'absolute' }} />
						</Block>

						<Block
							row
							style={{ marginTop: theme.SIZES.BASE, marginBottom: theme.SIZES.BASE * 2 }}
						>
							<Button
								shadowless
								style={styles.button}
								color={nowTheme.COLORS.PRIMARY}
								onPress={() => navigation.navigate("Pulseira")}
							>
								<Text style={{ fontFamily: 'montserrat-bold', fontSize: 14 }} color={theme.COLORS.WHITE}>
									Hóspede
                  				</Text>
							</Button>
						</Block>

						<Block
							row
							style={{ marginBottom: theme.SIZES.BASE * 4 }}
						>
							<Button
								shadowless
								style={styles.button}
								color={nowTheme.COLORS.PRIMARY}
								onPress={() => navigation.navigate("DashboardTabs")}
							>
								<Text
									style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
									color={theme.COLORS.WHITE}
								>
									Externo
                  				</Text>
							</Button>
						</Block>

					</Block>
				</Block>
			</Block>
		</Block>
	);
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(Object.assign(TokenActions, RoomActions), dispatch);

export default connect(null, mapDispatchToProps)(Onboarding);