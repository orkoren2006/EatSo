const initialState = {
    exps: [],
  };
  
  export function expReducer (state = initialState, action = {}) {
    switch (action.type) {
      case 'SET_EXPS':
        return { ...state, exps: action.exps };
      case 'ADD_EXP':
        return { ...state, exps: [...state.exps, action.exps] };
      case 'UPDATE_EXP':
        return {
          ...state,
          exps: state.exps.map(exp =>
            exp._id === action.exp._id ? action.exp : exp
          )};
      default:
        return state;
    }
  }
  