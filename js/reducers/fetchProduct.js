export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: false,
    data: {}
};

const initiaSublState = {
    successSub: false,
    data: {}
};

export function fetchProduct(state: State = initiaSublState, action) {
    if (action.type === 'FETCH_PRODUCT_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_PRODUCT_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;

}


export function fetchCategories(state: State = initialState, action) {
    if (action.type === 'FETCH_CATEGORIES_FAILED') {
        return {
            ...state,
            success: false,
        };
    }
    if (action.type === 'FETCH_CATEGORIES_SUCCESS') {
        return {
            ...state,
            success: true,
            data: action.data,
        };
    }
    return state;

}