import React from 'react'
import { View } from 'react-native'

function Row({children}) {
     return (
          <View style={{flexDirection:'row'}}>
               {children}
          </View>
     )
}

export default Row
