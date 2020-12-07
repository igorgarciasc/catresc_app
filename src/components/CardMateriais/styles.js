import {StyleSheet} from 'react-native'

import colors from '../../global/colors'
import fonts from '../../global/fonts'

const styles = StyleSheet.create({
    
    body: {
        padding: 15,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoTitle:{
        fontSize:30,
        fontFamily: fonts.Lato_900Black
    },
    infoDescription: {
        color: colors.textLight
    },
    infoSubDescription: {
        color: colors.text,
        alignContent:'stretch',
        maxWidth: 200,
        fontFamily: fonts.Poppins_300Light,
        fontSize: 12,
        lineHeight: 15
    },
    description: {
        marginTop:20,
        fontSize:20
    },
    footer:{
        backgroundColor: colors.backgroundFooter,
    },
    buttonContainer: {
        flexDirection: 'row',
        padding:10
    },
    buttonLabel: {
        color: colors.textWhite
    },
    buttonLabelBold:{
        fontSize: 20,
        fontFamily: fonts.Poppins_700Bold
    },
    buttonLarge: {
        height: 60
    },
    button: {
        padding: 10,
        alignContent: 'center',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 5,
        flex: 1
    },
    buttonDanger: {
        backgroundColor: colors.buttonDanger,
    },
    buttonWarning: {
        backgroundColor: colors.buttonWarning,
    },
    buttonSuccess: {
        backgroundColor: colors.buttonSuccess,
    }




});

export default styles;