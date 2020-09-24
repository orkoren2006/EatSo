const initialState = {
  exps: null
};

export function expReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_EXPS':
      return { ...state, exps: action.exps };
    case 'ADD_EXP':
      return { ...state, exps: [...state.exps, action.exp] };
    case 'UPDATE_EXP':
      const expsToSave = state.exps.map(exp => {
        if (exp._id === action.exp._id) return action.exp
        else { return exp }
      })
      return {
        ...state,
        exps: expsToSave
      }
    default:
      return state;
  }
}
