import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function addOrderSuccess(res) {
    return {
        type: "ADD_ORDER_SUCCESS",
        res
    };
}
export function addOrderFailed(error) {
    return {
        type: "ADD_ORDER_FAILED",
        error
    };
}

export function addOrder(params) {
    console.log('params action', params)
    let url = mConstants.BASE_URL + 'order/addorder'
    return dispatch => {
        APIRequest.APIRequestPOST(url, params, true,
            response => {
                console.log('respone', response)
                dispatch(addOrderSuccess(response));
            },
            error => {
                console.log('error', error)
                dispatch(addOrderFailed(error));
            }
        )
    };
}
