import React, { useState, useEffect } from 'react'
import { Block, theme, Text } from "galio-framework";
import { ScrollView, RefreshControl, Alert } from "react-native";
import Header from '../../components/Header'
import api from '../../services/api'

import CardNotification from '../../components/CardNotification'

import styles from './styles.js'

function Notificacoes({ navigation }) {

    const [notificacoes, setNotificacoes] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    function load() {
        setRefreshing(true)
        api.get('app/notifications').then(result => {
            setNotificacoes(result.data.data);
            setRefreshing(false)
        })
    }

    useEffect(() => {
        load();
    }, []);

    const onRefresh = React.useCallback(() => {
        load()
    }, []);

    let body;
    if (notificacoes.length > 0)
    {
        body = notificacoes.map(nt => {
            return <CardNotification key={nt.id} item={{ title: nt.titulo, description: nt.texto, cta: `Enviado em ${nt.createdAt}` }} />
        })
    } else
    {
        body = (<Text style={{ fontFamily: 'montserrat-regular', marginTop: 30 }} center muted>
            Em breve avisamos você {"\n"} sobre alguma coisa :)
        </Text>)
    }

    return (
        <Block flex style={{ flexDirection: 'column' }}>
            <Block style={{ marginBottom: theme.SIZES.BASE }}>
                <Header
                    title="NOTIFICAÇÃO"
                    logout={true}
                    navigation={navigation}
                    bgColor="#F4AE00"
                    titleColor="white"
                    iconColor="white"
                    white={true}
                />
            </Block>
            <Block flex>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
                />}>
                    <Block style={styles.container}>
                        {body}
                    </Block>
                </ScrollView>
            </Block>
        </Block>
    )
}

export default Notificacoes
