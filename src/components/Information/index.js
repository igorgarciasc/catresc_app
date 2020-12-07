import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

function Information({number, description, color}) {
     return (
          <View style={[styles.container,{backgroundColor: color,}]} >
               <Text style={styles.number}>
                    {number}
               </Text>
               <Text style={styles.description}>
                    {description}
               </Text>
          </View>
     )
}

export default Information
