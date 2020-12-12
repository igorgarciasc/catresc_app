export function setRoom(number, chkt) {
    return {
        type: 'SET_ROOM',
        number: number,
        chkt: chkt
    };
}

export function emptyRoom() {
    return {
        type: 'EMPTY_ROOM'
    };
}