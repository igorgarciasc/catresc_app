import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

import Card from "../Card";

import styles from "./styles";

function CardOcorrencia() {
	const { navigate } = useNavigation();

	const onPressRegistro = () => {
		navigate("OcorrenciaTabs");
	};

	const onPressNegouAtendimento = () => {
		navigate("NegouAtendimento");
	};

	const onPressFinalizar = () => {
		alert("Finalizando");
	};

	const onPressQta = () => {
		alert("QTA");
	};

	useEffect(() => {
		NetInfo.fetch().then((state) => {
			console.log("Connection type", state.type);
			console.log("Is connected?", state.isConnected);
		});
	});

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

				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#f2f2f2",
					}}
				>
					<Text style={styles.motive}>ATROPELAMENTO</Text>
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
						onPress={onPressNegouAtendimento}
					>
						<FontAwesome5
							style={styles.buttonLabel}
							name="user-slash"
							size={21}
						/>
					</RectButton>

					<RectButton
						style={[styles.button, styles.buttonSuccess]}
						onPress={onPressFinalizar}
					>
						<FontAwesome5 style={styles.buttonLabel} name="check" size={21} />
					</RectButton>

					<RectButton
						style={[styles.button, styles.buttonWarning]}
						onPress={onPressQta}
					>
						<Text style={[styles.buttonLabel, styles.buttonLabelBold]}>
							QTA
						</Text>
					</RectButton>
				</View>

				<View style={styles.buttonContainer}>
					<RectButton
						style={[styles.buttonDanger, styles.button, styles.buttonLarge]}
						onPress={onPressRegistro}
					>
						<Text style={[styles.buttonLabel, styles.buttonLabelBold]}>
							REGISTRO
						</Text>
					</RectButton>
				</View>
			</View>
		</Card>
	);
}

export default CardOcorrencia;
