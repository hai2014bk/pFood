import { combineReducers } from "redux";

import { items, itemsHasErrored, itemsIsLoading } from "./dataFetch";
import {creatAcount} from "./createAccount";
import {login} from "./login";
import { forgetPassword } from "./forgetPassword"
import { fetchCategories ,fetchSubCategories} from "./fetchCategories"



export default combineReducers({
	items,
	itemsHasErrored,
	itemsIsLoading,
	creatAcount,
	login,
	forgetPassword,
	fetchCategories,
	fetchSubCategories

});
