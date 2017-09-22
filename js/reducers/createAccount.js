export type State = {
    success:boolean,  
    kind: string
}

const initialState = {
  success:true,
  kind:'',
};


export function creatAcount(state:State = initialState, action) {
  if (action.type === 'CREATE_ACCOUNT_FAILED') {
    return {
      ...state,
      success: false,
      kind: 'server'
    };
  }
  if (action.type === 'CREATE_ACCOUNT_SUCCESS') {
    return {
      ...state,
        success: true,
    };
  }
  if (action.type === 'DUPLICATE_EMAIL') {
    return {
      ...state,
      success: false,
      kind: 'duplicate'
    };
  }
  return state;

}