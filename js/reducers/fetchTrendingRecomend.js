export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: true,
    data: {}
};
const secondState = {
    success: false,
    data: {}
};

//Trending
export function fetchBannerRecomend(state: State = secondState, action) {
    if (action.type === 'FETCH_BANNER_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_BANNER_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}

//Trending
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

//Lastest
export function fetchLastestRecomend(state: State = secondState, action) {
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
//Lowest
export function fetchLowestRecomend(state: State = secondState, action) {
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
