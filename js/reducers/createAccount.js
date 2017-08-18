export function createAccountSuccess(state = true, action) {
	console.log(2222)
	switch (action.type) {
		case "CREATE_ACCOUNT_SUCCESS":
		console.log(111)
			return action.message;
		default:
			return state;
	}
}
export function createAccountFailed(state = false, action) {
	switch (action.type) {
		case "CREATE_ACCOUNT_FAILED":
			return action.error;
		default:
			return state;
	}
}