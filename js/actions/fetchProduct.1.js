import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchProductSuccess(data) {
	return {
		type: "FETCH_PRODUCT_SUCCESS",
		data
	};
}

export function fetchProductFailed(error) {
	return {
		type: "FETCH_PRODUCT_FAILED",
		error
	};
}

export function fetchProduct(params) {
	let url = mConstants.BASE_URL + 'product/getproductbycategory'
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,true,
			response => {
				console.log('respone',response)
				dispatch(fetchProductSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchProductFailed(error));
			}
		)
	};
}
