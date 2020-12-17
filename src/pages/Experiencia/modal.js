import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { Button, Text } from 'galio-framework'
import Card from '../../components/NewCard'
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from "react-redux";

import api from '../../services/api'

function ExperienciaModal({ show, setShow, expirence, room, token, onSuccess }) {

    const [disponibilidade, setDisponibilidade] = useState(false)
    const [selectedDay, setSelectedDay] = useState(false);
    const [selectedHour, setSelectedHour] = useState(false);
    const [selectedOption, setSelectedOption] = useState(false)
    const [spinner, setSpinner] = useState(false);
    const [opcoes, setOpcoes] = useState([]);
    const [horariosDisponiveis, setHorariosDisponiveis] = useState(false)

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
                        const opcao = selectedOption.descricao ? selectedOption.descricao : '';
                        const valor = selectedOption.descricao ? selectedOption.valor : '';
                        setSpinner(true)
                        api.post('app/agendar', { dia, hora, expe, quarto, opcao, valor }, { headers: { Authorization: `Barer ${token.value}` } }).then((result) => {
                            Alert.alert(
                                'Concluído',
                                'Agendamento realizado com sucesso!',
                                [
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            setSelectedHour(false)
                                            setSelectedDay(false)
                                            setHorariosDisponiveis(false)
                                            setShow(!show)
                                            onSuccess()
                                        }
                                    }
                                ]
                            );
                        }).catch(err => {
                            console.log(err)
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
        if (expirence.disponibilidade && expirence.disponibilidade.length > 0)
        {
            setDisponibilidade(expirence.disponibilidade)
        } else
        {
            setDisponibilidade(false)
        }
        if (expirence.opcoes && expirence.opcoes.length > 0)
        {
            setOpcoes(expirence.opcoes)
            setSelectedOption(false)
        } else
        {
            setOpcoes(false)
            setSelectedOption(false)
        }

    }, [expirence])

    function closeModal() {
        setSelectedDay(false)
        setSelectedHour(false)
        setHorariosDisponiveis(false)
        setSelectedOption(false)
        setShow(!show)
    }

    function handleClickSelectDay(day) {
        setSelectedDay(day)
        setSelectedHour(false)
        setHorariosDisponiveis(false)
        setSelectedOption(false)
        if (day.horarios.length > 0)
        {
            setHorariosDisponiveis(true)
        }
    }

    function handleClickSelectHour(hour) {
        setSelectedHour(hour)
        if (!opcoes)
        {
            setSelectedOption(true)
        }
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

                    <View
                        style={{
                            width: '100%',
                            height: 200,
                        }}
                    >
                        <Card item={{ title: expirence.nome, image: expirence.image, cancelText: `Cancelamento até ${expirence.cancelamento} minutos antes da reserva`, body: expirence.descricao, valor: expirence.valor, subtitle: `${expirence.duracao} minutos` }} horizontal />
                    </View>
                    {
                        disponibilidade && (

                            <View style={{
                                backgroundColor: '#fff',
                                width: '100%',
                                alignItems: 'center',
                                borderRadius: 5,
                                paddingHorizontal: 10,
                                paddingVertical: 5,
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
                                                paddingVertical: 7,
                                                backgroundColor: selectedDay === horario ? '#42929d' : '#fff'
                                            }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: selectedDay === horario ? '#fff' : '#000' }}>{horario.nome}</Text>
                                                <Text style={{ fontSize: 15, color: selectedDay === horario ? '#fff' : '#000' }}>{horario.dia}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                        )}

                    <View style={{
                        backgroundColor: '#fff',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginBottom: 4,
                        height: 65
                    }}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Hora</Text>
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{}}>
                            {
                                selectedDay && selectedDay.horarios.map(ee => (
                                    <TouchableOpacity key={ee.valor} onPress={() => handleClickSelectHour(ee)} style={{
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

                    {
                        opcoes && (
                            <View style={{
                                backgroundColor: '#fff',
                                flexDirection: 'column',
                                width: '100%',
                                height: 150,
                                alignItems: 'center',
                                borderRadius: 5,
                                padding: 10,
                                marginBottom: 4
                            }}>
                                <View>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Opção</Text>
                                </View>
                                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                                    {
                                        selectedHour && opcoes && opcoes.map((ee, index) => (
                                            <TouchableOpacity key={index} onPress={() => setSelectedOption(ee)} style={{
                                                width: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                backgroundColor: selectedOption === ee ? '#42929d' : '#fff'
                                            }}>
                                                <Text style={{ fontSize: 15, color: selectedOption === ee ? '#fff' : '#000' }}>{ee.descricao} - {ee.valor}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                        )
                    }

                    <View
                        style={{ zIndex: -10, width: '100%' }}
                    >
                        {
                            disponibilidade && (

                                <Button
                                    shadowless
                                    style={{ marginBottom: 4, width: '100%', backgroundColor: selectedOption ? '#6DBE98' : '#ccc' }}
                                    onPress={() => handleClickAgendamento()}
                                    disabled={selectedOption ? false : true}
                                >
                                    <Text
                                        style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                                        color="#ffffff"
                                    >
                                        Agendar
                  				</Text>
                                </Button>
                            )
                        }

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
        backgroundColor: '#42929d',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        minHeight: 600,
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