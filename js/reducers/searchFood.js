export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: true,
    data: {}
};


export function searchPopular(state: State = initialState, action) {
    if (action.type === 'SEARCH_POPULAR_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'SEARCH_POPULAR_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}

export function searchFood(state: State = initialState, action) {
    if (action.type === 'SEARCH_FOOD_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'SEARCH_FOOD_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}
