import { hostService } from '../../services/hostService';
import { loading, doneLoading } from './systemActions';

// THUNK
export function loadExps() {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading);
      const exps = await hostService.getExps();
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
// THUNK
export function removeExp(expId) {
  return async dispatch => {
    try {
      await hostService.remove(expId);
      dispatch({ type: 'EXP_REMOVE', expId });
    } catch (err) {
      console.log('ExpActions: err in removeExp', err);
    }
  };
}

export function saveExp(exp) {
  return async dispatch => {
    try {
      const expObj = await hostService.save(exp);
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

