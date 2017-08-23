export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: true,
    data: {}
};

export function fetchSubCategories(state: State = initialState, action) {
    if (action.type === 'FETCH_SUB_CATEGORIES_FAILED') {
        return {
            ...state,
            success: false,
        };
    }
    if (action.type === 'FETCH_SUB_CATEGORIES_SUCCESS') {
        return {
            ...state,
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