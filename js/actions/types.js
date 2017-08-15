export type Action =
	| { type: "ITEMS_HAS_ERRORED" }
	| { type: "ITEMS_IS_LOADING" }
	| { type: "ITEMS_FETCH_DATA_SUCCESS" };

export type Dispatch = (action: Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
