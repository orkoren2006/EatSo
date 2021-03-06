import { userService } from '../../services/userService';
import { loading, doneLoading } from './systemActions';

// THUNK
export function loadUsers() {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading);
      const users = await userService.getUsers();
      dispatch({ type: 'SET_USERS', users });
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
    } finally {
      dispatch(doneLoading);
    }
  };
}
// THUNK
export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId);
      dispatch({ type: 'USER_REMOVE', userId });
    } catch (err) {
      console.log('UserActions: err in removeUser', err);
    }
  };
}
// THUNK
export function login(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.login(userCreds);
      dispatch({ type: 'SET_USER', user });
    } catch (err) {
      console.log('UserActions: err in Login', err);
      throw Error(err);
    }
  };
}
export function signup(userCreds) {
  return async dispatch => {
    const user = await userService.signup(userCreds);
    dispatch({ type: 'SET_USER', user });
  };
}
export function logout() {
  return async dispatch => {
    try {
      await userService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      console.log('UserActions: err in logout', err);
      dispatch({
        type: 'SEND_NOTIFICATION',
        notification: { msg: `Logout failed`, isSuccessed: false }
      });
    };
  }
}
