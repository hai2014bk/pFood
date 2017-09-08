import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchUserSuccess(data) {
    return {
        type: "FETCH_USER_SUCCESS",
        data
    };
}

export function fetchUserFailed(error) {
    return {
        type: "FETCH_USER_FAILED",
        error
    };
}

export function fetchUser(email) {
    let url = mConstants.BASE_URL + 'user/getuserbyemail?emai=' + email
    return dispatch => {
        APIRequest.APIRequestGET(url, true,
            response => {
                console.log('respone', response)
                dispatch(fetchProductSuccess(response));
            },
            error => {
                console.log('error', error)
                dispatch(fetchProductFailed(error));
            }
        )
    };
}
