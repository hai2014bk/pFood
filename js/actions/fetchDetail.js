import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchProductDetailSuccess(data) {
	return {
		type: "FETCH_PRODUCTDETAIL_SUCCESS",
		data
	};
}

export function fetchProductDetailFailed(error) {
	return {
		type: "FETCH_PRODUCTDETAIL_FAILED",
		error
	};
}

export function fetchDetail(id) {
	let url = mConstants.BASE_URL + 'product/' + id
	return dispatch => {
		updateRate(id)
		APIRequest.APIRequestGET(url, true,
			response => {
				console.log('respone', response)
				dispatch(fetchProductDetailSuccess(response));
			},
			error => {
				console.log('error', error)
				dispatch(fetchProductDetailFailed(error));
			}
		)
	};
}
export function updateRate(id) {
	let url = mConstants.BASE_URL + 'product/updateproductview'
	var param = {
		"ProductId": id
	}
	APIRequest.APIRequestPOST(url, param, true,
		response => {
			console.log('update View success', response)
		},
		error => {
			console.log('update View error', error)
		}
	)
}
