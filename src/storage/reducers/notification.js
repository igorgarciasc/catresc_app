const INITIAL_STATE = {
    request: false,
    value: ''
};

export default function notification(state = INITIAL_STATE, action) {
    switch (action.type)
    {
        case "SET_PUSHTOKEN":
            return { ...state, request: true, value: action.data };
        default:
            return { ...state };
    }
}
