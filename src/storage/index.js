import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';


import thunk from 'redux-thunk';

import rootReducer from './reducers/index'

const persistConfig = {
    key: 'appcatre',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

export { store, persistor }