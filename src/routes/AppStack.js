import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import Onboarding from "../pages/Onboarding";
import Pulseira from "../pages/Pulseira";
//import Digitar from "../pages/Pulseira/digitar";
import Instrucoes from "../pages/Instrucoes";
import DashboardTabs from "../routes/DashboardTabs";

function AppStack() {
	return (
		<NavigationContainer>
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen name="Onboarding" component={Onboarding} />
				<Screen name="Instrucoes" component={Instrucoes} />
				<Screen name="Pulseira" component={Pulseira} />
				<Screen name="DashboardTabs" component={DashboardTabs} />
			</Navigator>
		</NavigationContainer>
	);
}

export default AppStack;
