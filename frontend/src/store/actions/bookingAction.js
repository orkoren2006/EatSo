import {bookingService} from '../../services/bookingService';
import { loading, doneLoading } from './systemActions';

// THUNK
export function loadBookings(filterBy) {
  return async dispatch => {
    try {
      dispatch(loading);
      const bookings = await bookingService.query(filterBy);      
      dispatch({ type: 'SET_BOOKINGS', bookings });
    } catch (err) {
      console.log('BookingActions: err in loadBookings', err);
    } finally {
      dispatch(doneLoading);
    }
  };

}

// THUNK
export function removeBooking(bookingId) {
  return async dispatch => {
    try {
      await bookingService.remove(bookingId);
      dispatch({ type: 'REMOVE_BOOKING', bookingId });
    } catch (err) {
      console.log('BookingActions: err in removeBooking', err);
    }
  };
}

export function saveBooking(_booking) {
  const type = _booking._id ? 'EDIT_BOOKING' : 'ADD_BOOKING'
  return async dispatch => {
    try {
      const booking = await bookingService.save(_booking);
      dispatch({ type, booking})
    } catch (err) {
      console.log('BookingsActions: err in SaveBooking', err);
    }
  };
}

// export function getById(bookingId) {
//   return async dispatch => {
//     try {
//       dispatch(loading);
//       const booking = await bookingService.getById(bookingId);
//       dispatch({ type: 'SET_BOOKING', booking });
//     } catch (err) {
//       console.log('BookingActions: err in loadBookings', err);
//     } finally {
//       dispatch(doneLoading);
//     }
//   };
// }
