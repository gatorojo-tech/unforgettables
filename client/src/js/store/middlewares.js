import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import {persistMiddleware} from '../redux/middlewares/persistMiddleware.js';

const loggerMiddleware = createLogger({ collapsed: true });

const middlewares = [
  reduxThunk,
  persistMiddleware,
];

if (process.env.NODE_ENV === "development") middlewares.push(loggerMiddleware);

export default middlewares.map(
  (middleware) => applyMiddleware(middleware)
);
