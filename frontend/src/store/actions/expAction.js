import { expService } from '../../services/expService';
import { loading, doneLoading } from './systemActions';

// THUNK
export function loadExps() {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading);
      const exps = await expService.getExps();
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
      await expService.remove(expId);
      dispatch({ type: 'EXP_REMOVE', expId });
    } catch (err) {
      console.log('ExpActions: err in removeExp', err);
    }
  };
}

