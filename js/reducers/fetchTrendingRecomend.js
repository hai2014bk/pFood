export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: false,
    data: {}
};

export function fetchTrendingRecomend(state: State = initialState, action) {
    if (action.type === 'FETCH_TRENDINGRECOMEND_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_TRENDINGRECOMEND_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}

export function fetchLastestRecomend(state: State = initialState, action) {
    if (action.type === 'FETCH_LASTESTRECOMEND_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_LASTESTRECOMEND_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}
export function fetchLowestRecomend(state: State = initialState, action) {
    if (action.type === 'FETCH_LOWESTRECOMEND_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_LOWESTRECOMEND_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}
