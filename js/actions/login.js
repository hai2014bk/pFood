import * as  APIRequest from '../utils/Api';
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
	console.log('email', email)
	let url = mConstants.BASE_URL + 'user/getuserbyemail?email=' + email
	return dispatch => {
		APIRequest.APIRequestGET(url, true,
			response => {
				console.log('respone fetch user', response)
				AsyncStorage.setItem(
					mConstants.USER_DETAIL,
					JSON.stringify(response)).then(() =>
						{
							dispatch(fetchUserSuccess(response));							
						}
					);
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
	params.role = "consumer"	
	var isAuth = false
	console.log(params)
	return dispatch => {
		APIRequest.APIRequestPOST(url, params, isAuth,
			response => {
				var date = new Date()
				response.date = date
				console.log('21dsfvefads',response)
				AsyncStorage.setItem(
					mConstants.USER_INFO,
					JSON.stringify(response)
				);
				console.log('i239210321312',response.model.userEmail)
				dispatch(loginSuccess(response));
				dispatch(fetchUser(response.model.userEmail));
			},
			error => {
				dispatch(loginFailed(error));
			}
		)
	};
}
