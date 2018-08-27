import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './js/App.jsx';
import './styles/application.css';
import store from './js/store.js';

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

