import {
  GET_INTRADAY_BEGIN,
  GET_INTRADAY_SUCCESS,
  GET_INTRADAY_ERROR,
  GET_LATEST_BEGIN,
  GET_LATEST_SUCCESS,
  GET_LATEST_ERROR,
} from '../actions/types';

const initialState = {
  loadingIntraday: false,
  intradayData: {},
  intradayError: '',
  loadingLatestPrice: false,
  latestPrice: '',
  latestPriceError: '',
  //loadingDaily: false,
  //dailyData: [],
  //dailyError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INTRADAY_BEGIN:
      return {
        ...state,
        loadingIntraday: true,
        intradayError: '',
      };
    case GET_INTRADAY_SUCCESS:
      return {
        ...state,
        loadingIntraday: false,
        intradayData: action.payload.data,
      };
    case GET_INTRADAY_ERROR:
      return {
        ...state,
        loadingIntraday: false,
        intradayData: {},
        intradayError: action.payload.error,
      };
    case GET_LATEST_BEGIN:
      return {
        ...state,
        loadingLatestPrice: true,
        latestPriceError: '',
      };
    case GET_LATEST_SUCCESS:
      return {
        ...state,
        loadingLatestPrice: false,
        latestPrice: action.payload.data,
      };
    case GET_LATEST_ERROR:
      return {
        ...state,
        loadingLatestPrice: false,
        latestPrice: null,
        latestPriceError: action.payload.error,
      };
    default:
      return state;
  }
};
