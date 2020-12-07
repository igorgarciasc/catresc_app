import React from 'react'
import {View, StyleSheet} from 'react-native'

function index({children}) {

     const styles = StyleSheet.create({
          container: {
               padding: 10
          }
     });

     return (
          <View style={styles.container}>
               {children}
          </View>
     )
}

export default index
