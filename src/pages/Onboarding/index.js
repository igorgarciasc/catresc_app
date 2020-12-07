import React, { useState } from 'react';
import { ImageBackground, Image, StatusBar, Dimensions, View } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { useFocusEffect } from '@react-navigation/native'
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../../constants/';

import { connect } from "react-redux";
import { registerForPushNotifications } from '../../services/pushNotifications'

import styles from "./styles";

function Onboarding({ notification, token, navigation }) {

	useFocusEffect(() => {
		if (!notification.request)
		{
			registerForPushNotifications();
		}
	});

	const onHandlerNaoHospedado = () => {
		navigation.navigate("DashboardTabs");
	};

	const onHandlerHospedado = () => {
		navigation.navigate("Pulseira");
	};

	return (
		<Block flex style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Block flex>
				<ImageBackground
					source={Images.Onboarding}
					style={{ flex: 1, height: '100%', width, zIndex: 1 }}
				/>
				<Block space="between" style={styles.padded}>
					<Block>

						<Block middle>
							<Image source={Images.NowLogo} style={{ bottom: 150, position: 'absolute' }} />
						</Block>

						<Block
							row
							style={{
								marginTop: theme.SIZES.BASE,
								marginBottom: theme.SIZES.BASE * 2
							}}
						>
							<Button
								shadowless
								style={styles.button}
								color={nowTheme.COLORS.PRIMARY}
								onPress={onHandlerHospedado}
							>
								<Text
									style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
									color={theme.COLORS.WHITE}
								>
									Hóspede
                  				</Text>
							</Button>
						</Block>

						<Block
							row
							style={{
								marginBottom: theme.SIZES.BASE * 4
							}}
						>
							<Button
								shadowless
								style={styles.button}
								color={nowTheme.COLORS.PRIMARY}
								onPress={onHandlerNaoHospedado}
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

const mapStateToProps = (state) => ({
	notification: state.notification,
	token: state.token
});

export default connect(mapStateToProps, null)(Onboarding);