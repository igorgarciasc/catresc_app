import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { Button, Text } from 'galio-framework'
import Card from '../../components/CardModal'
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from "react-redux";

import api from '../../services/api'

function ExperienciaModal({ show, setShow, expirence, room, token }) {

    const [disponibilidade, setDisponibilidade] = useState([])
    const [selectedDay, setSelectedDay] = useState(false);
    const [selectedHour, setSelectedHour] = useState(false);
    const [spinner, setSpinner] = useState(false)

    function handleClickAgendamento() {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja realizar o agendamento?',
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        const dia = selectedDay.dia;
                        const hora = selectedHour.valor;
                        const expe = expirence.id;
                        const quarto = room.number;
                        setSpinner(true)
                        api.post('agendar', { dia, hora, expe, quarto }, { headers: { Authorization: `Barer ${token.value}` } }).then((result) => {
                            Alert.alert(
                                'Concluído',
                                'Agendamento realizado com sucesso!',
                                [
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            setSelectedHour(false)
                                            setSelectedDay(false)
                                            setShow(!show)
                                        }
                                    }
                                ]
                            );
                        }).catch(err => {
                            Alert.alert('Ops, não conseguimos enviar sua solicitação, tente novamente em alguns minutos!', '', [
                                { text: "Ok", onPress: () => setSpinner(false) }
                            ]);
                        })
                    }
                }
            ]
        );
    }

    useEffect(() => {
        setSpinner(false)
        setDisponibilidade(expirence.disponibilidade)
    }, [expirence])

    function closeModal() {
        setSelectedDay(false)
        setSelectedHour(false)
        setShow(!show)
    }

    function handleClickSelectDay(day) {
        setSelectedDay(day)
        setSelectedHour(false)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
        >
            <Spinner
                visible={spinner}
                textContent={'Solicitando...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <Card item={{ title: expirence.nome, image: expirence.image, body: expirence.descricao }} horizontal />

                    <View style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        alignItems: 'center',
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 4,
                    }}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Dia</Text>
                        </View>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                            {
                                disponibilidade && disponibilidade.map(horario => (
                                    <TouchableOpacity key={horario.dia} onPress={() => handleClickSelectDay(horario)} style={{
                                        width: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        marginLeft: 5,
                                        backgroundColor: selectedDay === horario ? '#42929d' : '#fff'
                                    }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: selectedDay === horario ? '#fff' : '#000' }}>{horario.nome}</Text>
                                        <Text style={{ fontSize: 15, color: selectedDay === horario ? '#fff' : '#000' }}>{horario.dia}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>

                    {
                        selectedDay && (
                            <View style={{
                                backgroundColor: '#fff',
                                flexDirection: 'column',
                                width: '100%',
                                alignItems: 'center',
                                borderRadius: 5,
                                padding: 10,
                                marginBottom: 4
                            }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{}}>
                                    {
                                        selectedDay && selectedDay.horarios.map(ee => (
                                            <TouchableOpacity key={ee.valor} onPress={() => setSelectedHour(ee)} style={{
                                                width: 50,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                marginLeft: 5,
                                                backgroundColor: selectedHour === ee ? '#42929d' : '#fff'
                                            }}>
                                                <Text style={{ fontSize: 15, color: selectedHour === ee ? '#fff' : '#000' }}>{ee.valor}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                        )
                    }

                    <Button
                        shadowless
                        style={{ marginBottom: 4, width: '100%', backgroundColor: selectedHour ? '#42929d' : '#ccc' }}
                        onPress={() => handleClickAgendamento()}
                        disabled={selectedHour ? false : true}
                    >
                        <Text
                            style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                            color="#ffffff"
                        >
                            Agendar
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

const mapStateToProps = (state) => ({
    room: state.room,
    token: state.token
});

export default connect(mapStateToProps, null)(ExperienciaModal);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        backgroundColor: '#FFB236',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        minHeight: 500,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});