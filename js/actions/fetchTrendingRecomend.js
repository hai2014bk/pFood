import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchTrendingTrendingRecomendSuccess(data) {
	return {
		type: "FETCH_TRENDINGRECOMEND_SUCCESS",
		data
	};
}

export function fetchTrendingTrendingRecomendFailed(error) {
	return {
		type: "FETCH_TRENDINGRECOMEND_FAILED",
		error
	};
}

export function fetchTrendingRecomend(params) {
	let url = mConstants.BASE_URL + 'product/getmostviewedproducts'
	console.log(url)
	return dispatch => {
		APIRequest.APIRequestPOST(url,params, true,
			response => {
				dispatch(fetchTrendingTrendingRecomendSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchTrendingTrendingRecomendFailed(error));
			}
		)
	};
}
