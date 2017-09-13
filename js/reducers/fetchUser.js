export type State = {
    success: boolean,
    data: array
}

const initialState = {
    success: true,
    data: []
};



export function fetchUser(state: State = initialState, action) {
    if (action.type === 'FETCH_USER_SUCCESS') {
        console.log('839891k')
        return {
            ...state,
            success: true,
        };
    }
    if (action.type === 'FETCH_USER_FAILED') {
        return {
            ...state,
            success: false,
            data: action.data,
        };
    }
    return state;

}