import React, { useState, useEffect } from 'react'
import { Block } from "galio-framework";
import Header from '../../components/Header'
import { ScrollView, RefreshControl, Alert } from "react-native";
import api from '../../services/api'
import Spinner from 'react-native-loading-spinner-overlay';
import Body from './body'

import styles from './styles'

import { connect } from "react-redux";

import { verifyCheckout } from '../../services/register';

function Reservas({ navigation, room }) {

    const [refreshing, setRefreshing] = useState(false);
    const [reservas, setReservas] = useState([]);
    const [spinner, setSpinner] = useState(false)

    function load(setRefreshingValue = true) {
        setRefreshing(setRefreshingValue)
        api.get(`app/reservas?limit=${room.number}`).then(result => {
            setRefreshing(false)
            setReservas(result.data.data);
        }).catch(err => {
            Alert.alert('Ops, aconteceu alguma coisa! Tente novamente em alguns minutos.', '', [
                { text: "Ok", onPress: () => setRefreshing(false) }
            ]);
        })
    }

    useEffect(() => {
        load()
        verifyCheckout(room, navigation)
    }, []);

    const onRefresh = React.useCallback(() => {
        load()
    }, []);

    const handleClickCancelExperiencia = (id) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja cancelar o agendamento?',
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        setSpinner(true)
                        api.post(`app/reservas/cancel`, { id, room: room.number }).then(result => {
                            setSpinner(false)
                            setReservas(result.data.data);
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

    return (
        <>
            <Spinner
                visible={spinner}
                textContent={'Solicitando...'}
                textStyle={{ color: '#FFF' }}
            />
            <Block flex style={{ flexDirection: 'column' }}>
                <Block>
                    <Header
                        title="EXPERIÊNCIA"
                        logout={true}
                        navigation={navigation}
                        bgColor="#F4AE00"
                        titleColor="white"
                        iconColor="white"
                        white={true}
                    />
                </Block>
                <Block flex>
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        <Body styles={styles} itens={reservas} handleClickCancelExperiencia={handleClickCancelExperiencia} />
                    </ScrollView>
                </Block>
            </Block>
        </>
    )
}

const mapStateToProps = (state) => ({
    room: state.room,
});

export default connect(mapStateToProps, null)(Reservas)