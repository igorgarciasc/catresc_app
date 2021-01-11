import React from 'react'
import {View} from 'react-native'
import { Block, Button, Text, theme } from 'galio-framework';
import { Image, StatusBar, Linking } from 'react-native';

import logoSemTexto from '../../../assets/somente_logo.png'


function Instrucoes({navigation}) {
    return (
        <Block flex style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingTop: 50, justifyContent: 'center' }}>
            <Block>

                <Block middle>
                    <Image source={logoSemTexto} style={{ width: 60, height: 45, top: 0 }} />
                </Block>

                <Block style={{ marginTop: 160, paddingHorizontal: 20 }}>
                    <Text center h4 style={{ fontFamily: 'montserrat-bold', lineHeight: 30 }}>Fique atento aos próximos passos:</Text>
                    <Text center h6 style={{ fontFamily: 'montserrat-regular', marginTop: 10 }}>1. Dê permissão para que o aplicativo do Catre/SC acesse a câmera do seu celular;</Text>
                    <Text center h6 style={{ fontFamily: 'montserrat-regular', marginTop: 10 }}>2. Aponte seu celular para o código de barras localizado na pulseira que você recebeu no checkin;</Text>
                    <Text center h6 style={{ fontFamily: 'montserrat-regular', marginTop: 10 }}>3. Pronto! Agora é só aguardar! Em alguns instantes, seu celular estará habilitado para os serviços disponíveis no Catre/SC </Text>
                    <Text center h6 style={{ fontFamily: 'montserrat-regular', marginTop: 10 }}> </Text>
                </Block>

                <Block center style={{ marginBottom: 10 }} >
                    <Button
                        shadowless
                        style={{
                            backgroundColor: '#42929D',
                            width: 230
                        }}
                        color='#fff'
                        onPress={() => navigation.navigate("Pulseira")}
                    >
                        <Text style={{ fontFamily: 'montserrat-bold', fontSize: 14 }} color={theme.COLORS.WHITE}>
                            Iniciar
                  				</Text>
                    </Button>
                </Block>

            </Block>            
        </Block>
    )
}

export default Instrucoes
