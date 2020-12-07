import React from "react";
import { View, Text, Share } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

import Card from "../Card";

import styles from "./styles";

function CardHistory() {
	const onShare = async () => {
		try {
			const result = await Share.share({
				message:
					"React Native | A framework for building native apps using React",
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const onView = () => {
		alert("Abrir documento");
	};

	return (
		<Card style={styles.card}>
			<View style={styles.body}>
				<View style={styles.info}>
					<View style={styles.infoLeft}>
						<Text style={styles.infoTitle}>#12345</Text>
						<Text style={styles.infoDescription}>10/10/2020 18:56h </Text>
					</View>
					<View style={styles.infoRight}>
						<Text style={styles.infoSubDescription}>
							Rua São Sebastião, 222
						</Text>
					</View>
				</View>

				<Text style={styles.description}>
					Vítima com trauma encefálico e com muitas dores fortes no peito,
					possível parada cardíaca
				</Text>
			</View>

			<View style={styles.footer}>
				<View style={styles.buttonContainer}>
					<RectButton
						style={[styles.button, styles.buttonWarning]}
						onPress={onShare}
					>
						<FontAwesome5
							style={styles.buttonLabel}
							name="share-alt"
							size={21}
						/>
					</RectButton>

					<RectButton
						style={[styles.button, styles.buttonSuccess]}
						onPress={onView}
					>
						<FontAwesome5 style={styles.buttonLabel} name="search" size={21} />
					</RectButton>
				</View>
			</View>
		</Card>
	);
}

export default CardHistory;
