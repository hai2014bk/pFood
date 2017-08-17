import { combineReducers } from "redux";

import { items, itemsHasErrored, itemsIsLoading } from "./dataFetch";
import { createAccountSuccess, createAccountFailed } from "./createAccount";
import {login} from "./login";



export default combineReducers({
	items,
	itemsHasErrored,
	itemsIsLoading,
	createAccountSuccess,
	createAccountFailed,
	login,
});
