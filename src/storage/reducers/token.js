const INITIAL_STATE = {
    value: false,
};

export default function token(state = INITIAL_STATE, action) {
    switch (action.type)
    {
        case "SET_TOKEN":
            return { ...state, value: action.data };
        case "EMPTY_TOKEN":
            return { ...state, value: false };
        default:
            return { ...state };
    }
}
