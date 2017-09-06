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

	;

export type Dispatch = (action: Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
