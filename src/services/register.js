import api from '../services/api'
import { Alert } from 'react-native';

import store from '../storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

const register = async (cod, onSuccess) => {
    const result = await api.post('register', { cod: cod });
    if (result.data.data.status)
    {
        store.dispatch({ type: 'SET_TOKEN', data: result.data.data.token })
    }
    else
    {
        alert('Ops, parece que você não está mais hospedado')
    }
    onSuccess()
}

const verifyCheckout = async (room, navigation) => {
    const data = room.chkt;
    if (data)
    {
        const dataSeparada = data.split('-')
        const dataCheckout = new Date(Number(dataSeparada[0]), Number(dataSeparada[1]) - 1, Number(dataSeparada[2]))
        const dataAgora = new Date();
        if (dataAgora > dataCheckout)
        {
            Alert.alert(
                'Ops',
                'Parace que você não está mais hospedado no CATRE/SC',
                [{
                    text: "OK", onPress: () => {
                        handlerLogout()
                        navigation.navigate('Onboarding');
                    }
                }]
            );
        }
    }
}

const handlerLogout = async () => {
    await AsyncStorage.removeItem('@appcatreToken');
    await AsyncStorage.removeItem('@appcatreRoom');
    store.dispatch({ type: 'EMPTY_TOKEN' });
    store.dispatch({ type: 'EMPTY_ROOM' });
}

export { register, verifyCheckout, handlerLogout }