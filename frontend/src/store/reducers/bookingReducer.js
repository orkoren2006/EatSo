
const initialState = {
  bookings: []
};

export function bookingReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return {
        ...state,
        bookings: action.bookings
      };
    case 'REMOVE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking._id !== action.bookingId)
      };
      case 'ADD_BOOKING':
        return {
            ...state,
            bookings: [action.booking, ...state.bookings]
        };
    case 'EDIT_BOOKING': 
        return {
            ...state,
            bookings: state.bookings.map(booking => booking._id === action.booking._id ? action.booking : booking)
        };

    default:
      return state;
  }
}
