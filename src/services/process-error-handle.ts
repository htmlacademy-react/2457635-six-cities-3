import {store} from '../store';
import {clearErrorAction} from '../store/api-actions';
import { setError } from '../store/slices/error-slice/error-action';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
