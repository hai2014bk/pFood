import { APIRequest } from '../utils/Api';


export function createAccountSuccess(message) {
	return {
		type: "LOGIN_SUCCESS",
		message
	};
}
export function createAccountFailed(error) {
	return {
		type: "LOGIN_FAILED",
		error
	};
}

export function login(params) {
	var url = "http://api.svina.net/api/user/login"
	var params = 'asdas'
	return dispatch => {
		APIRequest.APIRequestPOST()
		dispatch(createAccountSuccess(message));
		dispatch(createAccountFailed(false));
	};
}
