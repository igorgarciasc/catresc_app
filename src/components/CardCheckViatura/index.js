import React from 'react'
import { View, Text, Share } from 'react-native'
import {RectButton} from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons';

import Card from '../Card'

import styles from './styles'


function CardCheckViatura() {

     const onView = () => {
          alert('Abrir documento');
     }

     return (
          <Card style={styles.card}>

               <View style={styles.body}>

                    <View style={styles.info}>
                         <View style={styles.infoLeft}>
                              <Text style={styles.infoTitle}>10/10/2020 10:09h</Text>
                              <Text style={styles.infoDescription} >Bryan Bellissimo</Text>
                         </View>
                         <View style={styles.infoRight}>
                              <Text style={styles.infoSubDescription}>100.000km - 100.209km</Text>
                         </View>
                    </View>

               </View>

               <View style={styles.footer}>

                    <View style={styles.buttonContainer}>
                         
                         <RectButton style={[styles.button, styles.buttonSuccess]} onPress={onView} >
                              <FontAwesome5 style={styles.buttonLabel} name="search" size={21} />
                         </RectButton>
                         
                    </View>


               </View>

          </Card>
     )
}

export default CardCheckViatura
