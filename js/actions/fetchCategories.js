import * as  APIRequest from '../utils/Api.js'
export function fetchCategoriesSuccess(data) {
	return {
		type: "FETCH_CATEGORIES_SUCCESS",
		data
	};
}
export function fetchCategoriesFailed(error) {
	return {
		type: "FETCH_CATEGORIES_FAILED",
		error
	};
}
export function fetchSubCategoriesFailed(error) {
	return {
		type: "FETCH_SUB_CATEGORIES_FAILED",
		error
	};
}

export function fetchSubCategories(parentId) {
	let url = mConstant.BASE_URL + 'category/GetSubCategories/' + parentId
	console.log(url)
	return dispatch => {
		APIRequest.APIRequestGET(url, true,
			response => {
				console.log('respone',response)
				dispatch(fetchSubCategoriesSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchSubCategoriesFailed(error));
			}
		)
	};
}

export function fetchCategories() {
	let url = 'http://api.svina.net/api/category/GetAllCategories'
	return dispatch => {
		APIRequest.APIRequestGET(url, true,
			response => {
				console.log('respone',response)
				dispatch(fetchCategoriesSuccess(response));
			},
			error => {
				console.log('error',error)
				dispatch(fetchCategoriesFailed(error));
			}
		)
	};
}
