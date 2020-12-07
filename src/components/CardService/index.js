import React from "react";
import { View, Text, Share } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

import Card from "../Card";

import styles from "./styles";

function CardService({ title, departament, description }) {
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

			<View style={styles.footer}>
				<View style={styles.buttonContainer}>
					<RectButton style={[styles.button, styles.buttonDefault]}>
						<Text style={styles.buttonLabel}>SOLICITAR</Text>
					</RectButton>
				</View>
			</View>
		</Card>
	);
}

export default CardService;
