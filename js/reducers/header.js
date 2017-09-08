export type State = {
    
}

const initialState = {
  render:false,
};


export function reRender(state:State = initialState, action) {
  if (action.type === 'RERENDER_HEADER') {
    return {
      render: true,
    };
  }
  return state;
}
