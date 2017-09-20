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
