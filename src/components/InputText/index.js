import React from 'react'
import {View, Text, TextInput} from 'react-native'
import Card from '../Card'

import fonts from '../../global/fonts'

function InputText({label}) {
     return (
          <Card style={{paddingHorizontal: 20, paddingVertical: 20}}> 
               <View>
                    <Text style={{
                         fontSize: 20,
                         marginLeft: 10,
                         fontFamily: fonts.Lato_300Light
                    }}>
                         {label}
                    </Text>
                    <TextInput style={{ 
                         height: 60, 
                         fontSize:30,
                         padding: 5,
                         borderRadius: 10
                    }} />
               </View>
          </Card>
     )
}

export default InputText
