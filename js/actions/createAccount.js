import * as  APIRequest from '../utils/Api.js'
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
	let url = 'http://api.svina.net/api/user/register'
	return dispatch => {
		APIRequest.APIRequestPOST(url, params, false,
			response => {
				console.log(response)
				dispatch(createAccountSuccess(response));
			},
			error => {
				console.log(error)
				dispatch(createAccountFailed(error));
			}
		)
	};
}
