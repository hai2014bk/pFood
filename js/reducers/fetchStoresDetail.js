export type State = {
    success: boolean,
    data: array
}

const initialState = {
    success: true,
    data: []
};


//Banner
export function fetchStoreBanner(state: State = initialState, action) {
    if (action.type === 'FETCH_STOREBANNER_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_STOREBANNER_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}
//Product
export function fetchStoreProduct(state: State = initialState, action) {
    if (action.type === 'FETCH_STOREPRODUCT_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_STOREPRODUCT_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;

}
// Detail
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