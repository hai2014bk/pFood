import * as  APIRequest  from '../utils/Api';
import * as mConstants from '../utils/Constants'
import {
  AsyncStorage
} from "react-native";

export function loginSuccess(response) {
	return {
		type: 'LOGIN_SUCCESS',
		response
	};
}
export function loginFailed(error) {
	return {
		type: 'LOGIN_FAILED',
		error
	};
}

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
	console.log('email',email)
	let url = mConstants.BASE_URL + 'user/getuserbyemail?emai=' + email
	return dispatch => {
			APIRequest.APIRequestGET(url, true,
					response => {
							console.log('respone fetch user', response)
							dispatch(fetchUserSuccess(response));
					},
					error => {
							console.log('error fetch user', error)
							dispatch(fetchUserFailed(error));
					}
			)
	};
}

export function loginClick(params) {
	var url = mConstants.BASE_URL + "user/login"
	var params = params
	var isAuth = false
	console.log(params)
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,isAuth,
		response => {
			console.log(response)
			  AsyncStorage.setItem(
        mConstants.USER_INFO,
        JSON.stringify(response)
      );
			dispatch(loginSuccess(response));
			dispatch(fetchUser(params.email));
		},
		error => {
			dispatch(loginFailed(error));
		}
		)
	};
}
