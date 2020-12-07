import { StyleSheet } from "react-native";

import colors from "../../global/colors";

const styles = StyleSheet.create({
	container: {
		paddingTop: 60,
		paddingHorizontal: 20,
		backgroundColor: colors.backgroundHeader,
		paddingBottom: 30,
		marginBottom: -30,
		marginTop: -10,
	},
	topBar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontFamily: "Archivo_700Bold",
		color: "#fff",
		fontSize: 40,
		maxWidth: 300,
		lineHeight: 50,
	},
	headerBlock: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerFilter: {
		marginRight: 60,
	},
});

export default styles;
