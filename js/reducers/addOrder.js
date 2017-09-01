import type, {Action} from '../actions/types.js';

export type State = {
    success: boolean,
    message: '',
}

const initialState = {
    success: true,
    message: '',
};


export function addOrder (state: State = initialState, action) {
    if (action.type === "ADD_ORDER_FAILED") {
        return {
            ...state,
            success: false,
            message:'Has an error while update your order, check your network and try again',
        };
    }
    if (action.type === "ADD_ORDER_SUCCESS") {
        console.log('sdkasdjaslk')
        return {
            ...state,
            success: true,
            message: 'Update order success',
        };
    }
    return state;

}