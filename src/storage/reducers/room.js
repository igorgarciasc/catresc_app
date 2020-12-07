const INITIAL_STATE = {
    number: false,
    chkt: false
};

export default function room(state = INITIAL_STATE, action) {
    switch (action.type)
    {
        case "SET_ROOM":
            return { ...state, number: action.number, chkt: action.chkt };
        case "EMPTY_ROOM":
            return { ...state, number: false, chkt: false };
        default:
            return { ...state };
    }
}
