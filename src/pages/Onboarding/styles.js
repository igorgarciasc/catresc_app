import { StyleSheet, Dimensions, Platform } from 'react-native';
import { theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { HeaderHeight } from '../../constants/utils';

const styles = StyleSheet.create({

	container: {
		backgroundColor: '#ffffff',
		marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
	},
	padded: {
		paddingHorizontal: theme.SIZES.BASE * 2,
		zIndex: 3,
		position: 'absolute',
		top: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
	}
});

export default styles