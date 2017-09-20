import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchHistoriesSuccess(data) {
	return {
		type: "FETCH_HISTORIES_SUCCESS",
		data
	};
}

export function fetchHistoriesFailed(error) {
	return {
		type: "FETCH_HISTORIES_FAILED",
		error
	};
}
export function fetchHistoryDetailSuccess(data) {
	return {
		type: "FETCH_HISTORYDETAIL_SUCCESS",
		data
	};
}

export function fetchHistoryDetailFailed(error) {
	return {
		type: "FETCH_HISTORYDETAIL_FAILED",
		error
	};
}

export function updateRate(params) {
	let url = mConstants.BASE_URL + 'product/rateproduct'
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,true,
			response => {
				console.log('respone',response)
			},
			error => {
				console.log('error',error)
			}
		)
	};
}

export function fetchHistoryDetail(id) {
	let url = mConstants.BASE_URL + '/order/' + id
	return dispatch => {
		APIRequest.APIRequestGET(url,true,
			response => {
				console.log('respone',response)
				dispatch(fetchHistoryDetailSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchHistoryDetailFailed(error));
			}
		)
	};
}
export function fetchHistories(params) {
	let url = mConstants.BASE_URL + 'order/getorderhistories'
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,true,
			response => {
				console.log('respone',response)
				dispatch(fetchHistoriesSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchHistoriesFailed(error));
			}
		)
	};
}

