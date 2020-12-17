import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Reservas from "../pages/Reservas";
import Experiencia from "../pages/Experiencia";

import nowTheme from '../constants/Theme';

const { Navigator, Screen } = createMaterialTopTabNavigator();

function ExperienciaTabs({ token }) {

    return (
        <Navigator
            tabBarPosition="bottom"
            tabBarOptions={{
                tabBarPosition: "bottom",
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
                indicatorStyle: {
                    backgroundColor: nowTheme.COLORS.PRIMARY
                },
                inactiveTintColor: nowTheme.COLORS.DEFAULT,
                activeTintColor: nowTheme.COLORS.PRIMARY
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