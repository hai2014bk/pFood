export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: false,
    data: {}
};



export function fetchTrending(state: State = initialState, action) {
    if (action.type === 'FETCH_TRENDING_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_TRENDING_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;

}
