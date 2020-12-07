import { StyleSheet } from "react-native";
import { theme } from "galio-framework";
import { nowTheme } from '../../constants'
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: theme.SIZES.BASE
	},
	title: {
		fontFamily: 'montserrat-bold',
		paddingBottom: theme.SIZES.BASE,
		marginTop: 44,
		color: nowTheme.COLORS.HEADER
	}
});

export default styles;
