import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import reducers from './store/reducers';
import middlewares from './store/middlewares';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(...middlewares);

const store = createStore(reducers, {}, enhancer);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
