export type State = {
    jobs:String,
    cats:String,
    success:boolean,
    kind:String,
    error:string,
}

const initialState = {
  success:true,
};


export function login(state:State = initialState, action) {
  if (action.type === 'LOGIN_FAILED') {
    return {
      ...state,
      success: false,
    };
  }
  if (action.type === 'LOGIN_SUCCESS') {
    console.log(action);
    return {
      ...state,
        success: true,
    };
  }
  return state;

}