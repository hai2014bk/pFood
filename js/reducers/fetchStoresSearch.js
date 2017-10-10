export type State = {
    success: boolean,
    data: array
}

const initialState = {
    success: true,
    data: []
};



export function fetchStoresSearch(state: State = initialState, action) {
    if (action.type === 'FETCH_STORESSEARCH_FAILED') {
        return {
            ...state,
            success: false,
        };
    }
    if (action.type === 'FETCH_STORESSEARCH_SUCCESS') {
        return {
            ...state,
            success: true,
            data: action.data,
        };
    }
    return state;

}