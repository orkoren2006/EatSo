const initialState = {
    exps: null
  };
  
  export function expReducer (state = initialState, action = {}) {
    switch (action.type) {
      case 'SET_EXPS':
        return { ...state, exps: action.exps };
      case 'ADD_EXP':
        return { ...state, exps: [...state.exps, action.exps] };
      case 'SAVE_EXP':
        let expsToSave;
            if (action.isNew) {
                expsToSave = [...state.exps, action.exp]
            } else {
                expsToSave = state.exps.map(exp => {
                    if (exp._id === action.exp._id) return action.exp
                    else { return exp }
                })
            }
            
            return {
                ...state,
                exps: expsToSave
            }
      default:
        return state;
    }
  }
  