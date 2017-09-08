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
        return {
            ...state,
            success: false,
        };
    }
    if (action.type === 'FETCH_USER_FAILED') {
        return {
            ...state,
            success: true,
            data: action.data,
        };
    }
    return state;

}