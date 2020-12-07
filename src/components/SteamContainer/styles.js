import {StyleSheet} from 'react-native'

import colors from '../../global/colors'
import fonts from '../../global/fonts'

const styles = StyleSheet.create({
     teamContainer:{
          backgroundColor: colors.backgroundHeader,
          padding: 10,
          borderRadius: 8,
          borderColor: colors.backgroundHeader,

     },
     headTitle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
     },
     iconTeam: {
          color: colors.textWhite,
          marginRight: 10
     },
     titleTeam: {
          color: colors.textWhite,
          fontSize: 30,
          fontFamily: fonts.Poppins_300Light
     },

     teamBody: {
          paddingVertical: 10,
          flexDirection: 'row'
     },
     teamPeopleContainer: {
          backgroundColor: colors.backgroundFooter,
          borderRadius: 8,
          padding: 15,
          marginHorizontal: 5,
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 150
     },

     teamPeopleName: {
          fontFamily: fonts.Archivo_700Bold,
          fontSize: 15,
          textAlign: 'center'
     },
     teamPeopleFunction: {
          color: colors.buttonWarning,
          padding: 20
     },
     buttonChangeTeam:{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          backgroundColor: colors.buttonPrimary,
          borderRadius: 8
     },
     buttonText: {
          color: colors.textWhite,
          fontSize:20,
          fontFamily: fonts.Archivo_700Bold
     },
});

export default styles;