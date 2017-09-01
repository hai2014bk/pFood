export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: true,
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
