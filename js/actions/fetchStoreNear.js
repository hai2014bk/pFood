import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchStoresNearSuccess(data) {
	return {
		type: "FETCH_NEARSTORES_SUCCESS",
		data
	};
}

export function fetchStoresNearFailed(error) {
	return {
		type: "FETCH_NEARSTORES_FAILED",
		error
	};
}

export function fetchStoresNear(params) {
	let url = mConstants.BASE_URL + 'store/GetStoreList'
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,true,
			response => {
				dispatch(fetchStoresNearSuccess(response));
			},
			error => {
				dispatch(fetchStoresNearFailed(error));
			}
		)
	};
}
