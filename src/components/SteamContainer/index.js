import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScrollView, RectButton } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons';


import styles from './styles'

function index() {

     const onLongPressRemoveEquipe = () => {
          alert('Remover Equipe')
     }

     const onPressAddMember = () => {
          alert('Add Member');
     }
     
     return (
          <View style={styles.teamContainer}>
                         
          <View style={styles.headTitle}>
               <FontAwesome5 name="users" size={40} style={styles.iconTeam} />
          </View>

          <View style={styles.teamBody}>

               <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{flex:1}}
               >

               <TouchableOpacity onLongPress={onLongPressRemoveEquipe} style={styles.teamPeopleContainer}>
                    <Text style={styles.teamPeopleName}>
                        FRANCISCO IGOR GARCIA
                    </Text>
                    <Text style={styles.teamPeopleFunction}>
                         <FontAwesome5 name="ambulance" size={40} />
                    </Text>   
               </TouchableOpacity>

          </ScrollView>

          </View>

          <RectButton style={styles.buttonChangeTeam} onPress={onPressAddMember}>
               <Text style={styles.buttonText}>
                    ADICIONAR MEMBRO
               </Text>
          </RectButton>

     </View>
     )
}

export default index
