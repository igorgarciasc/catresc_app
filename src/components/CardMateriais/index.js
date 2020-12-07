import React from 'react'
import { View, Text, Share } from 'react-native'
import {RectButton} from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons';

import Card from '../Card'

import styles from './styles'

function CardMateriais() {

     const onCheck = () => {
          alert('Check');
     }

     return (
          <Card style={styles.card}>

               <View style={styles.body}>

                    <View style={styles.info}>
                         <View style={styles.infoLeft}>
                              <Text style={styles.infoTitle}>10/10/2020 18:56h</Text>
                              <Text style={styles.infoDescription} >Ocorrência #12345 </Text>
                         </View>
                         <View style={styles.infoRight}>
                              <Text style={styles.infoSubDescription}>UPA SUL</Text>
                         </View>
                    </View>

                    <Text style={styles.description} >
                         Maca rígida
                    </Text>

               </View>

               <View style={styles.footer}>

                    <View style={styles.buttonContainer}>

                         <RectButton style={[styles.button, styles.buttonSuccess]} onPress={onCheck} >
                              <FontAwesome5 style={styles.buttonLabel} name="check" size={21} />
                         </RectButton>
                         
                    </View>


               </View>

          </Card>
     )
}

export default CardMateriais
