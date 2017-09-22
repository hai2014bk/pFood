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

export function duplicateEmail(){
	return{
		type: "DUPLICATE_EMAIL",
	}
}

export function createAccount(params) {
	console.log('params action',params)
	let url = mConstants.BASE_URL + 'user/register'
	return dispatch => {
		APIRequest.APIRequestPOST(url, params, false,
			response => {
				if (response.errorMessage== null){
					dispatch(createAccountSuccess(response));
				}else{
					dispatch(duplicateEmail());
				}
			},
			error => {
				console.log('error',error)
				dispatch(createAccountFailed(error));
			}
		)
	};
}
