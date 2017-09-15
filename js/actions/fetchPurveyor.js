import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function fetchPurveyorSuccess(data) {
	return {
		type: "FETCH_PURVEYOR_SUCCESS",
		data
	};
}

export function fetchPurveyorFailed(error) {
	return {
		type: "FETCH_PURVEYOR_FAILED",
		error
	};
}

export function fetchPurveyor(params) {
	let url = mConstants.BASE_URL + 'purveyor/SearchPurveyor'
	return dispatch => {
		APIRequest.APIRequestPOST(url,params,true,
			response => {
				dispatch(fetchPurveyorSuccess(response));
			},
			error => {
				dispatch(fetchPurveyorFailed(error));
			}
		)
	};
}
