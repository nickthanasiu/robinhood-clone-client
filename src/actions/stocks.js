import axios from 'axios';
//import { API_URL } from '../api';

import {
  FETCH_STOCKS_BEGIN,
  FETCH_STOCKS_SUCCESS,
  FETCH_STOCKS_ERROR,
  BUY_STOCK_BEGIN,
  BUY_STOCK_SUCCESS,
  BUY_STOCK_ERROR,
  SELL_STOCK_BEGIN,
  SELL_STOCK_SUCCESS,
  SELL_STOCK_ERROR,
  GET_BUYING_POWER_BEGIN,
  GET_BUYING_POWER_SUCCESS,
  GET_BUYING_POWER_ERROR,
} from './types';

const API_URL = 'http://localhost:3090/api';

const fetchStocksBegin = () => ({
  type: FETCH_STOCKS_BEGIN
});

const fetchStocksSuccess = stocks => ({
  type: FETCH_STOCKS_SUCCESS,
  payload: { stocks }
});

const fetchStocksError = error => ({
  type: FETCH_STOCKS_ERROR,
  payload: { error }
});

export const getMyStocks = currentUserId => async (dispatch) => {
  try {
    dispatch(fetchStocksBegin());

    const response = await axios.post(`${API_URL}/get_stocks`, { currentUserId });
    const stocks = response.data;

    dispatch(fetchStocksSuccess(stocks));
  } catch (err) {
    dispatch(fetchStocksError());
  }
};

const getBuyingPowerBegin = () => ({
  type: GET_BUYING_POWER_BEGIN
});

const getBuyingPowerSuccess = buyingPower => ({
  type: GET_BUYING_POWER_SUCCESS,
  payload: { buyingPower }
});

const getBuyingPowerError = error => ({
  type: GET_BUYING_POWER_ERROR,
  payload: { error }
});

export const getBuyingPower = portfolioValueAsNum => async (dispatch) => {
  try {
    dispatch(getBuyingPowerBegin());
    const newValue = (5000 - portfolioValueAsNum).toLocaleString('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    dispatch(getBuyingPowerSuccess(newValue));
  } catch (err) {
    dispatch(getBuyingPowerError(err));
  }
};

const buyStockBegin = () => ({
  type: BUY_STOCK_BEGIN
});

const buyStockSuccess = stock => ({
  type: BUY_STOCK_SUCCESS,
  payload: { stock }
});

const buyStockError = error => ({
  type: BUY_STOCK_ERROR,
  payload: { error }
});

export const buyStock = (currentUserId, companyId, shares) => async (dispatch) => {
  try {
    dispatch(buyStockBegin());

    await axios.post(`${API_URL}/buy_stock`, {
      currentUserId,
      companyId,
      shares
    });

    setTimeout(() => {
      dispatch(buyStockSuccess());
    }, 2000);
  } catch (err) {
    dispatch(buyStockError(err));
  }
};

const sellStockBegin = () => ({
  type: SELL_STOCK_BEGIN
});

const sellStockSuccess = () => ({
  type: SELL_STOCK_SUCCESS
});

const sellStockError = error => ({
  type: SELL_STOCK_ERROR,
  payload: { error }
});

export const sellStock = (currentUserId, companyId, shares) => async (dispatch) => {
  try {
    dispatch(sellStockBegin());
    console.log('Beginning to SELL STOCK!!!');

    axios.post(`${API_URL}/sell_stock`, {
      currentUserId,
      companyId,
      shares
    });

    setTimeout(() => {
      dispatch(sellStockSuccess());
    }, 2000);
  } catch (err) {
    console.log('ERROR TRYING TO SELL STOCK?');
    dispatch(sellStockError(err));
  }
};
