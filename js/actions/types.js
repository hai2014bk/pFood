export type Action =
	| { type: "ITEMS_HAS_ERRORED" }
	| { type: "ITEMS_IS_LOADING" }
	| { type: "ITEMS_FETCH_DATA_SUCCESS" }
	| { type: "CREATE_ACCOUNT_SUCCESS"}
	| { type: "CREATE_ACCOUNT_FAILED"}
	| { type : "LOGIN_SUCCESS"}
	| { type : "LOGIN_FAILED"}
	;

export type Dispatch = (action: Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
