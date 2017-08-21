export type State = {
    success:boolean,  
}

const initialState = {
  success:true,
};


export function forgetPassword(state:State = initialState, action) {
  if (action.type === 'FORGET_PASSWORD_FAILED') {
    return {
      ...state,
      success: false,
    };
  }
  if (action.type === 'FORGET_PASSWORD_SUCCESS') {
    console.log('abc')
    return {
      ...state,
        success: true,
    };
  }
  return state;

}