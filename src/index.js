import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import throttle from 'lodash/throttle';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './localStorage';
import appReducer from './reducers';
import { SIGN_OUT } from './actions/types';

import App from './components/App';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import SignoutPage from './components/SignoutPage';
import Dashboard from './components/Dashboard';
import CompanyPage from './components/CompanyPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

const rootReducer = (state, action) => {
  // 'Clear' state when user signs out to secure user data
  // state will still exist in localStorage but all values will be undefined
  if (action.type === SIGN_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};


const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth,
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={SigninPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/signout" component={SignoutPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/company" component={CompanyPage} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
