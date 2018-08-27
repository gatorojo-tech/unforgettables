import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import productLists from '../redux/reducers/productLists.js';
import settings from '../redux/reducers/settings.js';
import saveCheck from '../redux/reducers/saveCheck.js';

export default combineReducers({
  productLists,
  settings,
  saveCheck,
  routing: routerReducer,
});
