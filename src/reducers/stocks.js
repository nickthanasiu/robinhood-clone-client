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
} from '../actions/types';

const initialState = {
  myStocks: [],
  loadingMyStocks: false,
  myStocksError: '',
  buyStockLoading: false,
  buyStockError: '',
  sellStockLoading: false,
  sellStockError: '',
  buyingPower: null,
  loadingBuyingPower: false,
  buyingPowerError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOCKS_BEGIN:
      return {
        ...state,
        loadingMyStocks: true,
        myStocksError: '',
      };
    case FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        loadingMyStocks: false,
        myStocks: action.payload.stocks,
      };
    case FETCH_STOCKS_ERROR:
      return {
        ...state,
        loadingMyStocks: false,
        myStocksError: action.payload.error,
        myStocks: [],
      };
    case BUY_STOCK_BEGIN:
      return {
        ...state,
        buyStockLoading: true,
        buyStockError: '',
      };
    case BUY_STOCK_SUCCESS:
      return {
        ...state,
        buyStockLoading: false,
      };
    case BUY_STOCK_ERROR:
      return {
        ...state,
        buyStockLoading: false,
        buyStockError: action.payload.error,
      };
    case SELL_STOCK_BEGIN:
      return {
        ...state,
        sellStockLoading: true,
        sellStockError: '',
      };
    case SELL_STOCK_SUCCESS:
      return {
        ...state,
        sellStockLoading: false,
      };
    case SELL_STOCK_ERROR:
      return {
        ...state,
        sellStockLoading: false,
        sellStockError: action.payload.error,
      };
    case GET_BUYING_POWER_BEGIN:
      return {
        ...state,
        loadingBuyingPower: true,
        buyingPowerError: '',
      };
    case GET_BUYING_POWER_SUCCESS:
      return {
        ...state,
        loadingBuyingPower: false,
        buyingPower: action.payload.buyingPower,
      };
    case GET_BUYING_POWER_ERROR:
      return {
        ...state,
        loadingBuyingPower: false,
        buyingPowerError: action.payload.error,
        buyingPower: null,
      };
    default:
      return state;
  }
};
