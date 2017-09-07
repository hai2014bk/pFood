export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: false,
    data: {}
};

export function fetchRelate(state: State = initialState, action) {
    if (action.type === 'FETCH_RELATE_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_RELATE_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}