import { combineReducers } from 'redux';
import { reviewReducer } from './reviewReducer'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer';
import { expReducer } from './expReducer';
import { bookingReducer } from './bookingReducer';


export const rootReducer = combineReducers({
  booking: bookingReducer,
  system: systemReducer,
  review: reviewReducer,
  user: userReducer,
  exp: expReducer
})
