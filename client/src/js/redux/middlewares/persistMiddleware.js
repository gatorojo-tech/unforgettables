import axios from 'axios';
import {actionTypesSavable, actionTypesUtil} from '../actions/actionTypes.js';

const routes = {
  lists: '/api/update_lists',
  products: '/api/update_products',
  settings: '/api/update_settings',
};

export const persistMiddleware = store => next => action => {
  next(action);

  if(!!actionTypesSavable[action.type] && action.saveNeeded !== false) {
    const route = routes[action.persistInfo];
    axios
      .post(route, action)
      .then(() => {
        store.dispatch({type: actionTypesUtil.SAVE_SUCCESS});
      })
      .catch(err => {
        console.error('request error', err);
      });
  }
};
