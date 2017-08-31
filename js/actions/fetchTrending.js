import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchTrendingSuccess(data) {
	return {
		type: "FETCH_TRENDING_SUCCESS",
		data
	};
}

export function fetchTrendingFailed(error) {
	return {
		type: "FETCH_TRENDING_FAILED",
		error
	};
}

export function fetchTrending(params) {
	let url = mConstants.BASE_URL + 'product/getmostviewedproducts'
	console.log(url)
	return dispatch => {
		APIRequest.APIRequestPOST(url,params, true,
			response => {
				dispatch(fetchTrendingSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchTrendingFailed(error));
			}
		)
	};
}
