import type, {Action} from '../actions/types.js';
import { ADD_ORDER_FAILED, ADD_ORDER_SUCCESS } from '../actions/addOrder.js';

export type State = {
    success: boolean,
    message: '',
}

const initialState = {
    success: true,
    message: '',
};


export default function (state: State = initialState, action) {
    if (action.type === ADD_ORDER_FAILED) {
        return {
            ...state,
            success: false,
            message:'Has an error while update your order, check your network and try again',
        };
    }
    if (action.type === ADD_ORDER_SUCCESS) {
        return {
            ...state,
            success: true,
            message: 'Update order success',
        };
    }
    return state;

}