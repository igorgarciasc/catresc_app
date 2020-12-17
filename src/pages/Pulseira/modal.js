import React, { useState } from 'react';

import { Modal, StyleSheet, View } from 'react-native';
import { Block, Button, Input, Text } from 'galio-framework'

function DigitarModal({ show, setShow, onProcess }) {

    const [inputCode, setInpuCode] = useState('');
    const [spinner, setSpinner] = useState(false)

    function closeModal() {
        setShow(!show)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Block fluid style={{ width: '100%', marginBottom: 10 }}>
                        <Input
                            center
                            placeholder="Digite o código de sua pulseira"
                            type='number-pad'
                            returnKeyType='done'
                            returnKeyLabel='Pronto'
                            enablesReturnKeyAutomatically={true}
                            value={inputCode}
                            onChangeText={(value) => setInpuCode(value)}
                            style={{ height: 60, fontSize: 50 }}
                        />
                    </Block>

                    <Button
                        shadowless
                        style={{ marginBottom: 4, width: '100%', backgroundColor: inputCode ? '#6DBE98' : '#cccccc' }}
                        onPress={() => {
                            setShow(!show)
                            onProcess({ data: inputCode })
                        }}
                        disabled={inputCode ? false : true}
                    >
                        <Text
                            style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                            color="#ffffff"
                        >
                            Entrar
                  				</Text>
                    </Button>

                    <Button
                        shadowless
                        style={{ marginBottom: 4, width: '100%' }}
                        color="#FF3636"
                        onPress={() => closeModal()}
                    >
                        <Text
                            style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                            color="#ffffff"
                        >
                            Fechar
                  				</Text>
                    </Button>

                </View>
            </View>
        </Modal>
    );
}

export default DigitarModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        backgroundColor: '#42929D',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        minHeight: 260,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%'
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});