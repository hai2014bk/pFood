import { combineReducers } from "redux";

import { items, itemsHasErrored, itemsIsLoading } from "./dataFetch";
import { createAccountSuccess, createAccountFailed } from "./createAccount";

export default combineReducers({
	items,
	itemsHasErrored,
	itemsIsLoading,
	createAccountSuccess,
	createAccountFailed
});
