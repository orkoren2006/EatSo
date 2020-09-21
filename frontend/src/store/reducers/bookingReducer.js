
const initialState = {
  bookings: []
};

export function bookingReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'BOOKING_REMOVE':
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking._id !== action.bookingId)
      };
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.bookings };
    default:
      return state;
  }
}
