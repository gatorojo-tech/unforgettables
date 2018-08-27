import axios from 'axios';
import { actionTypesUtil } from './actionTypes.js';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: actionTypesUtil.FETCH_USER, payload: res.data });
};
