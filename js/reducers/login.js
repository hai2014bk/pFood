export type State = {
    jobs:String,
    cats:String,
    success:boolean,
    kind:String,
    error:string,
}

const initialState = {
  response:'',
  cats:'',
  kind:'',
  error:'',
  success:true,
};

export function login(state:State = initialState, action) {
	console.log(action.type)
	 return {
      ...state,
      success:true
    };
}
