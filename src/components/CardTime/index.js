import React from "react";
import { View, Text, Share } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

import Card from "../Card";

import styles from "./styles";

import api from "../../services/api";

function CardTime({ title, departament, description, date, time }) {
	return (
		<Card style={styles.card}>
			<View style={styles.body}>
				<View style={styles.info}>
					<View style={styles.infoLeft}>
						<Text style={styles.infoTitle}>{title}</Text>
					</View>
					<View style={styles.infoRight}>
						<Text style={styles.infoSubDescription}>{departament}</Text>
					</View>
				</View>

				<Text style={styles.description}>{description}</Text>
			</View>
			<View style={styles.timer}>
				<Text style={styles.timerTime}>{time}</Text>
				<Text style={styles.timerData}>{date}</Text>
			</View>
		</Card>
	);
}

export default CardTime;
