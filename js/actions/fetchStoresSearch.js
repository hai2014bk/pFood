import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchStoresSearchSuccess(data) {
	return {
		type: "FETCH_STORESSEARCH_SUCCESS",
		data
	};
}

export function fetchStoresSearchFailed(error) {
	return {
		type: "FETCH_STORESSEARCH_FAILED",
		error
	};
}

export function fetchStoresSearch(params) {
	console.log('19jasdasdsa',params)
	let url = mConstants.BASE_URL + 'store/GetStoreList'
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,true,
			response => {
				dispatch(fetchStoresSearchSuccess(response));
			},
			error => {
				dispatch(fetchStoresSearchFailed(error));
			}
		)
	};
}
