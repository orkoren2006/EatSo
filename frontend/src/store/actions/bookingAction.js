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
      dispatch({ type: 'SEND_NOTIFICATION', notification:  {msg: 'Booking sent', isSuccessed: true } })
    } catch (err) {
      console.log('BookingsActions: err in SaveBooking', err);
    }
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 3000);
  };
}
