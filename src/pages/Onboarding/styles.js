import { StyleSheet, Dimensions, Platform } from 'react-native';
import { theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { HeaderHeight } from '../../constants/utils';

const styles = StyleSheet.create({

	container: {
		backgroundColor: theme.COLORS.BLACK,
		marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
	},
	padded: {
		paddingHorizontal: theme.SIZES.BASE * 2,
		zIndex: 3,
		position: 'absolute',
		bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
	},
	button: {
		width: width - theme.SIZES.BASE * 4,
		height: theme.SIZES.BASE * 3,
		shadowRadius: 0,
		shadowOpacity: 0
	},

	gradient: {
		zIndex: 1,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 66
	}
});

export default styles