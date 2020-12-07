import { StyleSheet } from "react-native";

import colors from "../../global/colors";
import fonts from "../../global/fonts";

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 20,
	},
	body: {
		padding: 15,
	},
	info: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	infoTitle: {
		fontSize: 30,
		fontFamily: fonts.Lato_900Black,
	},
	infoDescription: {
		color: colors.textLight,
	},
	infoSubDescription: {
		color: colors.text,
		alignContent: "stretch",
		maxWidth: 200,
		fontFamily: fonts.Poppins_300Light,
		fontSize: 12,
		lineHeight: 15,
	},
	timer: {
		backgroundColor: "#ccc",
		padding: 20,
	},
	timerTime: {
		fontSize: 30,
		fontFamily: fonts.Lato_900Black,
	},
	timerData: {
		fontSize: 35,
		fontFamily: fonts.Lato_900Black,
		alignContent: "center",
		justifyContent: "center",
	},
});

export default styles;
