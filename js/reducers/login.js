export type State = {
    jobs:String,
    cats:String,
    success:boolean,
    kind:String,
    error:string,
    info: Array
}

const initialState = {
  success:true,
  info: []
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

export function fetchUser(state:State = initialState, action) {
  if (action.type === 'FETCH_USER_FAILED') {
    return {
      ...state,
      info: action.error
    };
  }
  if (action.type === 'FETCH_USER_SUCCESS') {
    console.log(action);
    return {
      ...state,
      info: action.data
    };
  }
  return state;

}
