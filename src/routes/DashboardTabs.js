import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome5 } from "@expo/vector-icons";

import Programacao from "../pages/Programacao";
import Mapa from "../pages/Mapa";
import Experiencia from "../pages/Experiencia";
import Servicos from "../pages/Servicos";

import { connect } from "react-redux";

import nowTheme from '../constants/Theme';

import { getData } from "../services/storage";

const { Navigator, Screen } = createBottomTabNavigator();

function DashboardTabs({ token }) {
	const [phcatre, setPhcatre] = useState(false);

	return (
		<Navigator
			tabBarOptions={{
				style: {
					elevation: 0,
					shadowOpacity: 0,
					marginBottom: -29,
					height: 100
				},
				tabStyle: {
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					alignContent: "center",
				},
				iconStyle: {
					flex: 0,
					width: 40,
					height: 40,
					marginTop: 0
				},
				labelStyle: {
					fontSize: 13,
					marginLeft: 16,
				},
				inactiveBackgroundColor: nowTheme.COLORS.BORDER_COLOR,
				activeBackgroundColor: nowTheme.COLORS.BORDER_COLOR,
				inactiveTintColor: nowTheme.COLORS.DEFAULT,
				activeTintColor: nowTheme.COLORS.PRIMARY,
			}}
		>

			<Screen
				name="Programação"
				options={{
					tabBarLabel: '',
					tabBarIcon: ({ color, size, focused }) => {
						return (
							<FontAwesome5
								name="calendar-day"
								size={25}
								color={focused ? nowTheme.COLORS.PRIMARY : color}
							/>
						);
					},
				}}
				component={Programacao}
			/>

			<Screen
				name="Mapa"
				options={{
					tabBarLabel: " ",
					tabBarIcon: ({ color, size, focused }) => {
						return (
							<FontAwesome5
								name="map-signs"
								size={25}
								color={focused ? nowTheme.COLORS.PRIMARY : color}
							/>
						);
					},
				}}
				component={Mapa}
			/>

			{token.value && (
				<Screen
					name="Experiência"
					options={{
						tabBarLabel: '',
						tabBarIcon: ({ color, size, focused }) => {
							return (
								<FontAwesome5
									name="clock"
									size={25}
									color={focused ? nowTheme.COLORS.PRIMARY : color}
								/>
							);
						},
					}}
					component={Experiencia}
				/>
			)}

			{token.value && (
				<Screen
					name="Serviços"
					options={{
						tabBarLabel: '',
						tabBarIcon: ({ color, size, focused }) => {
							return (
								<FontAwesome5
									name="concierge-bell"
									size={25}
									color={focused ? nowTheme.COLORS.PRIMARY : color}
								/>
							);
						},
					}}
					component={Servicos}
				/>
			)}

		</Navigator>
	)

}

const mapStateToProps = (state) => ({
	token: state.token
});

export default connect(mapStateToProps, null)(DashboardTabs);