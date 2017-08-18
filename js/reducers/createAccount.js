export type State = {
    success:boolean,  
}

const initialState = {
  success:true,
};


export function creatAcount(state:State = initialState, action) {
  if (action.type === 'CREATE_ACCOUNT_FAILED') {
    return {
      ...state,
      success: false,
    };
  }
  if (action.type === 'CREATE_ACCOUNT_SUCCESS') {
    return {
      ...state,
        success: true,
    };
  }
  return state;

}