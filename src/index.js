import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import Welcome from './components/Welcome';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import SignoutPage from './components/SignoutPage';
import AccountPage from './components/AccountPage';
import Dashboard from './components/Dashboard';
import CompanyPage from './components/CompanyPage';

import { loadState, saveState } from './localStorage';
import appReducer from './reducers';
import { SIGN_OUT } from './actions/types';

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
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/signout" component={SignoutPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/company" component={CompanyPage} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
