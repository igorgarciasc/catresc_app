import React, { useState } from "react";
import {View, Text, TextInput, CheckBox, StyleSheet} from 'react-native'
import Card from '../Card'

import fonts from '../../global/fonts'

function Checkbox({label}) {

     const [isSelected, setSelection] = useState(false);

     return (
          <Card style={{paddingHorizontal: 20, paddingVertical: 20}}> 
               <View style={styles.checkboxContainer}>
                    <CheckBox
                         value={isSelected}
                         onValueChange={setSelection}
                         style={styles.checkbox}
                    />
                    <Text style={{
                         fontSize: 20,
                         marginLeft: 10,
                         fontFamily: fonts.Lato_300Light
                    }}>
                         {label}
                    </Text>
               </View>
          </Card>
     )
}

const styles = StyleSheet.create({
     checkboxContainer: {
       flexDirection: "row",
     },
     checkbox: {
       alignSelf: "center",
       height:20,
       width: 20
     }
   });
   

export default Checkbox
