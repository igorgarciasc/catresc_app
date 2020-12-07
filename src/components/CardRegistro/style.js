import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
     container:{
          borderColor: '#ccc',
          borderRadius: 8,
          borderWidth:1,
          backgroundColor: '#fff',
          overflow: 'hidden',
          margin: 3
     },
     profile:{
          flexDirection:'row',
          alignItems:'center',
          justifyContent: 'space-between',
          padding: 24
     },
     profileName: {
          fontSize:20,
          fontFamily: 'Archivo_700Bold',
     },
     profileSubject: {
          fontSize: 12,
          fontFamily: 'Poppins_300Light',
          color: '#ccc',
          marginTop: 4
     },
     bio: {
          marginHorizontal:24,
          marginBottom: 24,
          fontFamily:'Poppins_300Light',
          lineHeight: 24,
          fontSize: 12,
          flex: 1,
     },


});

export default styles;