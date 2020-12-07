import React from 'react'
import { View } from 'react-native'

function Card({children, style}) {
     return (
          <View style={{
               borderColor: '#ccc',
               borderRadius: 8,
               borderWidth:1,
               backgroundColor: '#fff',
               overflow: 'hidden',
               margin: 3,
               ...style}}
          >
               {children}
          </View>
     )
}

export default Card
