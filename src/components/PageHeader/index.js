import React from "react";
import { View, Text } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

function PageHeader({ title, pageBack = false, headerRight, children }) {
	return (
		<View style={styles.container}>
			<View style={styles.topBar}></View>

			<View style={styles.headerBlock}>
				<Text style={styles.title}>{title}</Text>
				{headerRight}
			</View>

			{children}
		</View>
	);
}

export default PageHeader;
