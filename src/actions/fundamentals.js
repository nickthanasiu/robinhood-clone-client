import axios from 'axios';
import { GET_FUNDAMENTALS_BEGIN, GET_FUNDAMENTALS_SUCCESS, GET_FUNDAMENTALS_ERROR } from './types';

const API_URL = 'https://doohnibor-server.herokuapp.com/api';

const getFundamentalsBegin = () => ({
  type: GET_FUNDAMENTALS_BEGIN
});

const getFundamentalsSuccess = data => ({
  type: GET_FUNDAMENTALS_SUCCESS,
  payload: { data }
});

const getFundamentalsError = error => ({
  type: GET_FUNDAMENTALS_ERROR,
  payload: { error }
});

export const getFundamentals = symbol => async (dispatch) => {
  try {
    dispatch(getFundamentalsBegin());
    const response = await axios.post(`${API_URL}/get_fundamentals`, { symbol });
    dispatch(getFundamentalsSuccess(response.data));
  } catch (err) {
    dispatch(getFundamentalsError(err));
  }
};
