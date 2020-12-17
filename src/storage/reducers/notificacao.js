const INITIAL_STATE = {
    contagem: 0,
    notificacoes: []
};

export default function notification(state = INITIAL_STATE, action) {
    switch (action.type)
    {
        case "INCREMENT_COUNT":
            return { ...state, contagem: contagem + 1 };
        default:
            return { ...state };
    }
}
