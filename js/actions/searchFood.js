import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function searchFoodSuccess(data) {
	return {
		type: "SEARCH_FOOD_SUCCESS",
		data
	};
}

export function searchFoodFailed(error) {
	return {
		type: "SEARCH_FOOD_FAILED",
		error
	};
}

export function searchPopularSuccess(data) {
	return {
		type: "SEARCH_POPULAR_SUCCESS",
		data
	};
}

export function searchPopularFailed(error) {
	return {
		type: "SEARCH_POPULAR_FAILED",
		error
	};
}

export function searchPopular(params) {
	let url = mConstants.BASE_URL + '/search/getpopularsearchterms'
	var params = {
        "PageSize":"6",
        "PageIndex":"1"
}
	return dispatch => {
		APIRequest.APIRequestPOST(url,params, true,
			response => {
				dispatch(searchPopularSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(searchPopularFailed(error));
			}
		)
	};
}
export function searchFood(params) {
	let url = mConstants.BASE_URL + 'product/getproducts'

	return dispatch => {
		APIRequest.APIRequestPOST(url,params, true,
			response => {
				console.log('sakdjasldas',response)
				dispatch(searchFoodSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(searchFoodFailed(error));
			}
		)
	};
}
