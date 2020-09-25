const initialState = {
  isLoading: false,
  notification: ''
};

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOADING_START':
      return { ...state, isLoading: true };
    case 'LOADING_DONE':
      return { ...state, isLoading: false };
    case 'SEND_NOTIFICATION':
      return {
        ...state,
        notification: action.notification
      }
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: action.notification
      }
    default: return state;
  }
}
