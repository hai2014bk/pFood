export function createAccountSuccess(message) {
	return {
		type: "CREATE_ACCOUNT_SUCCESS",
		message
	};
}
export function createAccountFailed(error) {
	return {
		type: "CREATE_ACCOUNT_FAILED",
		error
	};
}

export function createAccount(params) {
	return dispatch => {
		// dispatch(itemsIsLoading(true));
		// fetch(url)
		// 	.then(response => {
		// 		if (!response.ok) {
		// 			throw Error(response.statusText);
		// 		}
		// 		dispatch(itemsIsLoading(false));
		// 		return response;
		// 	})
		// 	.then(response => response.json())
		// 	.then(items => dispatch(itemsFetchDataSuccess(items)))
		// 	.catch(() => dispatch(itemsHasErrored(true)));
		dispatch(itemsFetchDataSuccess(url));
		dispatch(itemsIsLoading(false));
	};
}
