export type State = {
    success: boolean,
    data: array
}

const initialState = {
    success: false,
    data: []
};



export function fetchStores(state: State = initialState, action) {
    if (action.type === 'FETCH_STORES_FAILED') {
        return {
            ...state,
            success: false,
        };
    }
    if (action.type === 'FETCH_STORES_SUCCESS') {
        return {
            ...state,
            success: true,
            data: action.data,
        };
    }
    return state;

}