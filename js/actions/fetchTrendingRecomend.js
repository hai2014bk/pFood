import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

// Trending
export function fetchTrendingRecomendSuccess(data) {
	return {
		type: "FETCH_TRENDINGRECOMEND_SUCCESS",
		data
	};
}

export function fetchTrendingRecomendFailed(error) {
	return {
		type: "FETCH_TRENDINGRECOMEND_FAILED",
		error
	};
}
export function fetchTrendingRecomend(params) {
	let url = mConstants.BASE_URL + 'product/getmostviewedproducts'
	console.log(url)
	return dispatch => {
		APIRequest.APIRequestPOST(url, params, true,
			response => {
				dispatch(fetchLastestRecomend())
				dispatch(fetchTrendingRecomendSuccess(response));
			},
			error => {
				console.log('error', error)
				dispatch(fetchTrendingRecomendFailed(error));
			}
		)
	};
}

//Lastest
export function fetchLastestRecomendSuccess(data) {
	return {
		type: "FETCH_LASTESTRECOMEND_SUCCESS",
		data
	};
}

export function fetchLastestRecomendFailed(error) {
	return {
		type: "FETCH_LASTESTRECOMEND_FAILED",
		error
	};
}
export function fetchLastestRecomend() {
	let url = mConstants.BASE_URL + 'product/getproducts'
	console.log(url)
	var params = {
		"PageSize": "20",
		"PageIndex": "1",
		"OrderBy": "CreatedDate",
		"OrderDirection": "desc"
	}
	return dispatch => {
		APIRequest.APIRequestPOST(url, params, true,
			response => {
				dispatch(fetchLowestRecomend())
				dispatch(fetchLastestRecomendSuccess(response));
			},
			error => {
				console.log('error', error)
				dispatch(fetchLastestRecomendFailed(error));
			}
		)
	};
}

//Lowest Price
export function fetchLowestRecomendSuccess(data) {
	return {
		type: "FETCH_LOWESTRECOMEND_SUCCESS",
		data
	};
}

export function fetchLowestRecomendFailed(error) {
	return {
		type: "FETCH_LOWESTRECOMEND_FAILED",
		error
	};
}
export function fetchLowestRecomend() {
	let url = mConstants.BASE_URL + 'product/getproducts'
	console.log(url)
	var params = {
		"PageSize": "20",
		"PageIndex": "1",
		"OrderBy":"Price",
		"OrderDirection":"asc"
	}
	return dispatch => {
		APIRequest.APIRequestPOST(url, params, true,
			response => {
				dispatch(fetchLowestRecomendSuccess(response));
			},
			error => {
				console.log('error', error)
				dispatch(fetchLowestRecomendFailed(error));
			}
		)
	};
}




