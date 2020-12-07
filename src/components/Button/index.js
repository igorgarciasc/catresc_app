import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Text } from 'react-native'

import styles from './styles'

function Button({label,style}) {
     return (
          <RectButton style={{
               justifyContent: 'center',
               alignItems: 'center',
               padding: 20,
               borderRadius: 7,
               backgroundColor: '#ccc',
               flex: 1,
               marginBottom: 5
               ,...style}}  
          >
               <Text style={styles.label}>
                    {label}
               </Text>
          </RectButton>
     )
}

export default Button
