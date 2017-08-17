import * as  APIRequest  from '../utils/Api';


export function loginSuccess(response) {
	return {
		type: "LOGIN_SUCCESS",
		response
	};
}
export function loginFailed(error) {
	return {
		type: "LOGIN_FAILED",
		error
	};
}

export function loginClick(params) {
	var url = "http://api.svina.net/api/user/login"
	var params = params
	var isAuth = false
	console.log(params)
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,isAuth,
		response => {
			console.log(response)
			dispatch(loginSuccess(response));
		},
		error => {
			dispatch(loginFailed(error));
		}
		)
	};
}
