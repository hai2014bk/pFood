export type State = {
    success: boolean,
    data: array
}

const initialState = {
    success: false,
    data: []
};



export function fetchStoresDetail(state: State = initialState, action) {
    if (action.type === 'FETCH_STORESDETAIL_FAILED') {
        return {
            ...state,
            success: false,
        };
    }
    if (action.type === 'FETCH_STORESDETAIL_SUCCESS') {
        return {
            ...state,
            success: true,
            data: action.data,
        };
    }
    return state;

}