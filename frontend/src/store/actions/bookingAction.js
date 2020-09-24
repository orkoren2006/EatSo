import bookingService from '../../services/bookingService';
import { loading, doneLoading } from './systemActions';

// THUNK
export function loadBookings(filterBy) {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading);
      const bookings = await bookingService.getBookings(filterBy);
      dispatch({ type: 'SET_BOOKINGS', bookings });
    } catch (err) {
      console.log('BookingActions: err in loadBookings', err);
      // example for routing - after changing the store
      // history.push('/some/path');
    } finally {
      dispatch(doneLoading);
    }
  };

}
export function getById(bookingId) {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading);
      const booking = await bookingService.getById(bookingId);
      dispatch({ type: 'SET_BOOKING', booking });
    } catch (err) {
      console.log('BookingActions: err in loadBookings', err);
      // example for routing - after changing the store
      // history.push('/some/path');
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
      dispatch({ type: 'BOOKING_REMOVE', bookingId });
    } catch (err) {
      console.log('BookingActions: err in removeBooking', err);
    }
  };
}

export function saveBooking(booking) {
  return async dispatch => {
    try {
      const bookingObj = await bookingService.save(booking);
      dispatch({ type: 'SAVE_BOOKING', booking: bookingObj.booking, isNew: bookingObj.isNew })

    } catch (err) {
      console.log('BookingsActions: err in SaveBooking', err);
    }
  };
}

