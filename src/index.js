import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import Welcome from './components/Welcome';

import { loadState, saveState } from './localStorage';
import appReducer from './reducers';
import { SIGN_OUT } from './actions/types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/" exact component={Welcome} />
    </App>
  </BrowserRouter>,
  document.getElementById('app')
);
