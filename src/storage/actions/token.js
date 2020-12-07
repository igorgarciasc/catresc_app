export function setToken(token) {
    return {
        type: 'SET_TOKEN',
        data: token
    }
};

export function emptyToken() {
    return {
        type: 'EMPTY_TOKEN',
    }
};