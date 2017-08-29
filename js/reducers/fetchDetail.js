export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: false,
    data: {}
};


export function fetchDetail(state: State = initialState, action) {
    if (action.type === 'FETCH_PRODUCTDETAIL_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_PRODUCTDETAIL_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;

}