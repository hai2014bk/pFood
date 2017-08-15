import { combineReducers } from "redux";

import { items, itemsHasErrored, itemsIsLoading } from "./dataFetch";

export default combineReducers({
	items,
	itemsHasErrored,
	itemsIsLoading,
});
