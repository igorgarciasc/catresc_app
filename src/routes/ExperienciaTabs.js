import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Reservas from "../pages/Reservas";
import Experiencia from "../pages/Experiencia";

import nowTheme from '../constants/Theme';

const { Navigator, Screen } = createBottomTabNavigator();

function ExperienciaTabs({ token }) {

    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    marginBottom: -30,
                    height: 80
                },
                tabStyle: {
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                },
                labelStyle: {
                    fontSize: 16,
                },
                inactiveBackgroundColor: nowTheme.COLORS.BORDER_COLOR,
                activeBackgroundColor: "#ccc",
                inactiveTintColor: nowTheme.COLORS.DEFAULT,
                activeTintColor: nowTheme.COLORS.PRIMARY,
            }}
        >

            <Screen
                name="Experiencias"
                options={{
                    tabBarLabel: 'Experiências',
                    unmountOnBlur: true
                }}
                component={Experiencia}
            />

            <Screen
                name="Reservas"
                options={{
                    tabBarLabel: "Minhas Reservas",
                    unmountOnBlur: true
                }}
                component={Reservas}
            />

        </Navigator>
    )

}


export default ExperienciaTabs;