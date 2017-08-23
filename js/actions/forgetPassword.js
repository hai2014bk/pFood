import * as  APIRequest from '../utils/Api.js'
import * as mConstant from '../utils/Constants'

export function forgetPasswordSuccess(message) {
	return {
		type: "FORGET_PASSWORD_SUCCESS",
		message
	};
}
export function forgetPasswordFailed(error) {
	return {
		type: "FORGET_PASSWORD_FAILED",
		error
	};
}

export function forgetPassword(params) {
	let url = mConstant.BASE_URL + 'user/resetpassword'
	return dispatch => {
		APIRequest.APIRequestPOST(url, params, false,
			response => {
				console.log('respone',response)
				dispatch(forgetPasswordSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(forgetPasswordFailed(error));
			}
		)
	};
}
