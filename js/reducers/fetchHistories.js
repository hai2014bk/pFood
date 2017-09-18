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

export function fetchHistoryDetail(state: State = initiaSublState, action) {
    if (action.type === 'FETCH_HISTORYDETAIL_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_HISTORYDETAIL_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}

export function fetchHistories(state: State = initiaSublState, action) {
    if (action.type === 'FETCH_HISTORIES_FAILED') {
        return {
            success: false,
        };
    }
    if (action.type === 'FETCH_HISTORIES_SUCCESS') {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;
}

