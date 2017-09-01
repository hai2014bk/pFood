import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchStoresDetailSuccess(data) {
	return {
		type: "FETCH_STORESDETAIL_SUCCESS",
		data
	};
}

export function fetchStoresDetailFailed(error) {
	return {
		type: "FETCH_STORESDETAIL_FAILED",
		error
	};
}

export function fetchStoresDetail(id) {
	let url = mConstants.BASE_URL + 'store/'+id
	return dispatch => {
		APIRequest.APIRequestGET(url,true,
			response => {
				console.log('respone',response)
				dispatch(fetchStoresDetailSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchStoresDetailFailed(error));
			}
		)
	};
}
