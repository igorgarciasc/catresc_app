import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../storage/index'
import api from '../services/api'

const registerForPushNotifications = async (room) => {
    let pushNotification = { token: false, request: false, register: false, status: false, room: { chkt: false, number: false } }
    const pushNotificationStorage = JSON.parse(await AsyncStorage.getItem('@appcatrePushNotification'));
    if (pushNotificationStorage) pushNotification = pushNotificationStorage;

    pushNotification = await sendRegister(pushNotification, room);
    await AsyncStorage.setItem('@appcatrePushNotification', JSON.stringify(pushNotification))
}

const sendRegister = async (pushNotification, room) => {

    if (room.number !== pushNotification.room.number)
    {
        pushNotification.request = false;
        pushNotification.register = false;
        pushNotification.room = room;
    }

    if (!pushNotification.request)
    {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        pushNotification.request = true
        pushNotification.status = status
        if (status === 'granted')
        {
            if (!pushNotification.register)
            {
                const { data } = await Notifications.getExpoPushTokenAsync();
                try
                {
                    pushNotification.token = data;
                    const result = await api.post('app/token', { token: data, room: room.number, chkt: room.chkt });
                    pushNotification.register = true;
                    store.dispatch({ type: 'SET_PUSHTOKEN', data: data })
                    1
                }
                catch (err)
                {
                    console.log(err)
                }
            }
        }
    }
    return pushNotification;
}

export { registerForPushNotifications }