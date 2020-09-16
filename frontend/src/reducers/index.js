import { combineReducers } from 'redux';
import { reviewReducer } from './reviewReducer'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer';

export const rootReducer = combineReducers({
  system: systemReducer,
  review: reviewReducer,
  user: userReducer
})
