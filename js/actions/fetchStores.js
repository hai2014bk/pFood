import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchStoresSuccess(data) {
	return {
		type: "FETCH_STORES_SUCCESS",
		data
	};
}

export function fetchStoresFailed(error) {
	return {
		type: "FETCH_STORES_FAILED",
		error
	};
}

export function fetchStores(params) {
	let url = mConstants.BASE_URL + 'store/GetStoreList'
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,true,
			response => {
				console.log('respone',response)
				dispatch(fetchStoresSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchStoresFailed(error));
			}
		)
	};
}
