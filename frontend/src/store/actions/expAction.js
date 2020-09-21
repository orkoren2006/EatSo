import { expService } from '../../services/expService';
import { loading, doneLoading } from './systemActions';

// THUNK
export function loadExps(filterBy) {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading);
      const exps = await expService.getExps(filterBy);
      dispatch({ type: 'SET_EXPS', exps });
    } catch (err) {
      console.log('ExpActions: err in loadExps', err);
      // example for routing - after changing the store
      // history.push('/some/path');
    } finally {
      dispatch(doneLoading);
    }
  };

}
export function getExpById(expId) {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading);
      const exp = await expService.getExpById(expId);
      dispatch({ type: 'SET_EXP', exp });
    } catch (err) {
      console.log('ExpActions: err in loadExps', err);
      // example for routing - after changing the store
      // history.push('/some/path');
    } finally {
      dispatch(doneLoading);
    }
  };
}
// THUNK
export function removeExp(expId) {
  return async dispatch => {
    try {
      await expService.remove(expId);
      dispatch({ type: 'EXP_REMOVE', expId });
    } catch (err) {
      console.log('ExpActions: err in removeExp', err);
    }
  };
}

export function saveExp(exp) {
  return async dispatch => {
    try {
      const expObj = await expService.save(exp);
      dispatch({ type: 'SAVE_EXP', exp: expObj.exp, isNew: expObj.isNew })
      // const notificationTxt = (expObj.isNew) ? 'Toy Added' : 'Toy Updated'
      // dispatch({ type: 'SEND_NOTIFICATION', notification: notificationTxt })
      // setTimeout(() => {
      //   dispatch({ type: 'CLEAR_NOTIFICATION' })
      // }, 2000);
    } catch (err) {
      console.log('ExpsActions: err in SaveExp', err);
    }
  };
}

