const initialState = {
    exps: [],
  };
  
  export function expReducer (state = initialState, action = {}) {
    switch (action.type) {
      case 'SET_EVENTS':
        return { ...state, exps: action.exps };
      case 'ADD_EVENT':
        return { ...state, exps: [...state.exps, action.exps] };
      case 'UPDATE_EVENT':
        return {
          ...state,
          exps: state.exps.map(eventush =>
            eventush._id === action.exps._id ? action.exps : exps
          )};
      default:
        return state;
    }
  }
  