import { combineReducers } from "redux";

import { items, itemsHasErrored, itemsIsLoading } from "./dataFetch";
import {creatAcount} from "./createAccount";
import {login} from "./login";



export default combineReducers({
	items,
	itemsHasErrored,
	itemsIsLoading,
	creatAcount,
	login,
});
