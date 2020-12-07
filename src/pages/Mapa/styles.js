import { StyleSheet, Dimensions } from "react-native";

import colors from "../../global/colors";
import fonts from "../../global/fonts";

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default styles;
