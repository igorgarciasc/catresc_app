import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';

import { store } from '../storage/index'

import api from '../services/api'

const registerForPushNotifications = async () => {
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status !== 'granted')
        {
            return;
        }
        Notifications.getExpoPushTokenAsync().then(token => {
            api.post('token', { token: token.data }).then(result => {
                store.dispatch({ type: 'SET_PUSHTOKEN', data: token.data })
            })
        });
    });
}

export { registerForPushNotifications }