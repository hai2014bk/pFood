export type Action =
	| { type: "ITEMS_HAS_ERRORED" }
	| { type: "ITEMS_IS_LOADING" }
	| { type: "ITEMS_FETCH_DATA_SUCCESS" }
	| { type: "CREATE_ACCOUNT_SUCCESS" }
	| { type: "CREATE_ACCOUNT_FAILED" }
	| { type: "LOGIN_SUCCESS" }
	| { type: "LOGIN_FAILED" }
	| { type: "FORGET_PASSWORD_SUCCESS" }
	| { type: "FORGET_PASSWORD_FAILED" }
	| { type: "FETCH_CATEGORIES_SUCCESS" }
	| { type: "FETCH_CATEGORIES_FAILED" }
	| { type: "FETCH_PRODUCT_SUCCESS" }
	| { type: "FETCH_PRODUCT_FAILED" }
	| {type: "FETCH_PRODUCTDETAIL_SUCCESS"}
	| { type: "FETCH_PRODUCTDETAIL_FAILED" }
	| { type: "FETCH_TRENDING_SUCCESS" }
	| { type: "FETCH_TRENDING_FAILED" }
	| { type: "FETCH_STORES_SUCCESS" }
	| { type: "FETCH_STORES_FAILED" }
	| { type: "ADD_ORDER_SUCCESS" }
	| { type: "ADD_ORDER_FAILED" }
	| { type: "FETCH_RELATE_FAILED" }
	| { type: "FETCH_RELATE_SUCCESS" }
	| { type: "FETCH_LASTESTRECOMEND_SUCCESS" }
	| { type: "FETCH_LASTESTRECOMEND_FAILED" }
	| { type: "FETCH_LOWESTRECOMEND_FAILED" }
	| { type: "FETCH_LOWESTRECOMEND_SUCCESS" }
	| { type: "FETCH_BANNER_SUCCESS" }
	| { type: "FETCH_BANNER_FAILED" }	
	| { type: "FETCH_STOREPRODUCT_SUCCESS" }	
	| { type: "FETCH_STOREPRODUCT_FAILED" }	
	| { type: "FETCH_STOREBANNER_SUCCESS" }	
	| { type: "FETCH_STOREBANNER_FAILED" }	
	| { type: "RERENDER_HEADER" }	
	| { type: "FETCH_USER_SUCCESS" }	
	| { type: "FETCH_USER_FAILED" }	
	| { type: "FETCH_PURVEYOR_SUCCESS" }	
	| { type: "FETCH_PURVEYOR_FAILED" }	
	| { type: "FETCH_HISTORIES_SUCCESS"}
	| { type: "FETCH_HISTORIES_FAILED"}	
	| {	type: "FETCH_HISTORYDETAIL_FAILED"}
	| {	type: "FETCH_HISTORYDETAIL_SUCCESS"}
	| {	type: "SEARCH_FOOD_SUCCESS"}
	| {	type: "SEARCH_FOOD_FAILED"}
	| {	type: "	SEARCH_POPULAR_SUCCESS"}
	| {	type: "	SEARCH_POPULAR_FAILED"}
	| { type: "	DUPLICATE_FAILED" }
	
	
	;

export type Dispatch = (action: Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
