import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import user from './user';
import companies from './companies';
import newsfeed from './newsfeed';
import marketData from './marketData';
import stocks from './stocks';
import portfolio, * as fromPortfolio from './portfolio';
import modals from './modals';
import fundamentals from './fundamentals';

export default combineReducers({
  auth,
  user,
  modals,
  companies,
  newsfeed,
  marketData,
  stocks,
  portfolio,
  fundamentals,
  form: formReducer,
});

// Selector functions
export const getPortfolioData = (state, data) => state.portfolio;
export const getTimespan = state => fromPortfolio.getTimespan(state.portfolio);
export const getDailyChange = state => fromPortfolio.getDailyChange(state.portfolio);