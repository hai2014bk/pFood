export function createAccountSuccess(state = true, action) {
	switch (action.type) {
		case "CREATE_ACCOUNT_SUCCESS":
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