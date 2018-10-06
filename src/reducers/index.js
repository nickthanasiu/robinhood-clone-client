import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import user from './user';
import companies from './companies';
import newsfeed from './newsfeed';
import marketData from './marketData';
import stocks from './stocks';
import portfolio from './portfolio';
import modals from './modals';

export default combineReducers({
  auth,
  user,
  modals,
  companies,
  newsfeed,
  marketData,
  stocks,
  portfolio,
  form: formReducer,
});
