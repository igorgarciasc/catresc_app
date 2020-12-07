import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './style'
import { RectButton } from 'react-native-gesture-handler';

function CardRegistro() {
     return (
          <RectButton style={styles.container}>

                    <View style={styles.profile}>
                         <View style={styles.profileInfo} > 
                              <Text style={styles.profileName}>10/10/2020 07h ás 19h</Text>
                              <Text style={styles.profileSubject} >Gilnei Bellissimo </Text>
                              <Text style={styles.profileSubject} >
                                   <FontAwesome5 name="user-md" /> Fulano {'\n'}
                                   <FontAwesome5 name="user-md" /> Fulano {'\n'}
                                   <FontAwesome5 name="ambulance" /> Fulano {'\n'}
                                   <FontAwesome5 name="ambulance" /> Fulano {'\n'}
                                   <FontAwesome5 name="broadcast-tower" /> Fulano {'\n'}
                                   <FontAwesome5 name="broadcast-tower" /> Fulano {'\n'}
                              </Text>
                         </View>

                         <Text style={styles.bio} >
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                         </Text>

                    </View>

          </RectButton>
     )
}

export default CardRegistro
