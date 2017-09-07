import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

//Fetch Banner
export function fetchStoreBannerSuccess(data) {
	console.log('213j21321',data)
	return {
		type: "FETCH_STOREBANNER_SUCCESS",
		data
	};
}

export function fetchStoreBannerFailed(error) {
	return {
		type: "FETCH_STOREBANNER_FAILED",
		error
	};
}
export function fetchBanner() {
	let url = mConstants.BASE_URL + 'banner/getbanners'
	console.log(url)
	var params = {
		"ScreenName": "Store",
		"City": "",
	}
	return dispatch => {
		APIRequest.APIRequestPOST(url, params, true,
			response => {
				dispatch(fetchStoreBannerSuccess(response));
			},
			error => {
				console.log('error', error)
				dispatch(fetchStoreBannerFailed(error));
			}
		)
	};
}


//Store Product
export function fetchStoreProductSuccess(data) {
	return {
		type: "FETCH_STOREPRODUCT_SUCCESS",
		data
	};
}

export function fetchStoreProductFailed(error) {
	return {
		type: "FETCH_STOREPRODUCT_FAILED",
		error
	};
}

export function fetchStoreProduct(id) {
	let url = mConstants.BASE_URL + 'product/getproductsbystore'
	var params = {
		"PageSize":"100",
		"PageIndex":"1",
		"StoreId":id
	}
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,true,
			response => {
				console.log('respone344423441213',params)
				dispatch(fetchStoreProductSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchStoreProductFailed(error));
			}
		)
	};
}
//Store Detail
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
