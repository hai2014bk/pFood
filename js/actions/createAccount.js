import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function createAccountSuccess(message) {
	return {
		type: "CREATE_ACCOUNT_SUCCESS",
		message
	};
}
export function createAccountFailed(error) {
	return {
		type: "CREATE_ACCOUNT_FAILED",
		error
	};
}

export function createAccount(params) {
	console.log('params action',params)
	let url = mConstants.BASE_URL + 'user/register'
	return dispatch => {
		APIRequest.APIRequestPOST(url, params, false,
			response => {
				console.log('respone',response)
				dispatch(createAccountSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(createAccountFailed(error));
			}
		)
	};
}
