/*eslint-disable*/
import axios from 'axios';
import { API_URL } from '../api';

import {
  GET_PORTFOLIO_BEGIN,
  GET_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_ERROR,
  GET_PORTFOLIO_AS_NUM,
  GET_PORTFOLIO_INTRA_BEGIN,
  GET_PORTFOLIO_INTRA_SUCCESS,
  GET_PORTFOLIO_INTRA_ERROR,
} from './types';

const getPortfolioBegin = () => ({
  type: GET_PORTFOLIO_BEGIN
});

const getPortfolioSuccess = value => ({
  type: GET_PORTFOLIO_SUCCESS,
  payload: { value }
});

const getPortfolioError = error => ({
  type: GET_PORTFOLIO_ERROR,
  payload: { error }
});

const getPortfolioAsNum = numValue => ({
  type: GET_PORTFOLIO_AS_NUM,
  payload: { numValue }
});

export const getPortfolioValue = currentUserId => async dispatch => {
  try {
    dispatch(getPortfolioBegin());

    const response = await axios.post(`${API_URL}/portfolio_value`, { currentUserId });
    const value = response.data;
    const portfolioValueAsNum = value;
    const formatValue = value.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    dispatch(getPortfolioAsNum(value));
    dispatch(getPortfolioSuccess(formatValue));

  } catch (err) {
    dispatch(getPortfolioError(err));
  }
};

const getPortfolioIntraBegin = () => ({
  type: GET_PORTFOLIO_INTRA_BEGIN
});

const getPortfolioIntraSuccess = data => ({
  type: GET_PORTFOLIO_INTRA_SUCCESS,
  payload: { data }
});

const getPortfolioIntraError = error => ({
  type: GET_PORTFOLIO_INTRA_ERROR,
  payload: { error }
});

export const getPortfolioIntraday = symbols => async dispatch => {
  try {
    dispatch(getPortfolioIntraBegin());

    const response = await axios.post(`${API_URL}/portfolio_intraday`, { symbols });
    dispatch(getPortfolioIntraSuccess(response.data));

  } catch (err) {
    dispatch(getPortfolioIntraError(err));
  }
};
