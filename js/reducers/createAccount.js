export function createAccountSuccess(state = false, action) {
	console.log(2222)
	switch (action.type) {
		case "CREATE_ACCOUNT_SUCCESS":
		console.log(111)
			return true;
		default:
			return state;
	}
}
export function createAccountFailed(state = true, action) {
	switch (action.type) {
		case "CREATE_ACCOUNT_FAILED":
			return false;
		default:
			return state;
	}
}