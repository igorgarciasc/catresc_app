import { store } from '../storage/index'

import api from '../services/api'

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

export { register }