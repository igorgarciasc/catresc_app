import React, { useState, useEffect } from 'react'
import { Block } from "galio-framework";
import Header from '../../components/Header'
import { ScrollView, RefreshControl, Alert } from "react-native";
import api from '../../services/api'
import Spinner from 'react-native-loading-spinner-overlay';
import Body from './body'

import moment from 'moment-timezone'

import styles from './styles'

import { connect } from "react-redux";

import { verifyCheckout } from '../../services/register';

function Reservas({ navigation, room, token }) {

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
        navigation.addListener('focus', () => {
            load();
        });
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
                        api.post(`app/cancel/reservas`, { id, room: room.number }, { headers: { Authorization: `Barer ${token.value}` } }).then(result => {
                            setSpinner(false)
                            setReservas(result.data.data);
                        }).catch(err => {
                            let errorText = 'Ops, aconteceu algum problema. Tente novamente'
                            if (err.response.data.data)
                            {
                                errorText = err.response.data.data
                            }
                            Alert.alert(errorText, '', [
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
                        title="MINHAS RESERVAS"
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
    token: state.token
});

export default connect(mapStateToProps, null)(Reservas)