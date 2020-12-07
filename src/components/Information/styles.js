import {StyleSheet} from 'react-native'

import colors from '../../global/colors'

const styles = StyleSheet.create({

     container: {
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 7,
          flex: 1,
          padding: 10,
          marginBottom:10,
          marginHorizontal: 2
     },

     number: {
          fontSize: 40,
          fontFamily: 'Lato_900Black',
          color: '#fff'
     } ,

     description: {
          fontSize: 15,
          fontFamily: 'Lato_300Light',
          color: '#fff',
     } 



     


});

export default styles;