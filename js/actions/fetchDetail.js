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
export function fetchRelateSuccess(data) {
	console.log('susadkasdlas',data)
	return {
		type: "FETCH_RELATE_SUCCESS",
		data
	};
}

export function fetchRelateFailed(error) {
	console.log('susadkasdlas',error)	
	return {
		type: "FETCH_RELATE_FAILED",
		error
	};
}

export function fetchRelate(params) {
	console.log('pasjkndiqwdwq',params)
	let url = mConstants.BASE_URL + 'product/getproductbycategory'
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,true,
			response => {
				console.log('respone',response)
				dispatch(fetchRelateSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchRelateFailed(error));
			}
		)
	};
}

export function fetchDetail(id) {
	let url = mConstants.BASE_URL + 'product/' + id
	return dispatch => {
		updateRate(id)
		APIRequest.APIRequestGET(url, true,
			response => {
				console.log('respone', response)
				var food = response.model
				 var categoriesId = food.productCategories[0].id
				 var parameter = {
					"PageSize": 10,
					"PageIndex": 1,
					"CategoryId": categoriesId
				}
				dispatch(fetchRelate(parameter))
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
