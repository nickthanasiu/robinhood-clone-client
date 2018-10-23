import {
  GET_FUNDAMENTALS_BEGIN,
  GET_FUNDAMENTALS_SUCCESS,
  GET_FUNDAMENTALS_ERROR
} from '../actions/types';

const initialState = {
  loadingFundamentals: false,
  fundamentals: {},
  fundamentalsError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FUNDAMENTALS_BEGIN:
      return {
        loadingFundamentals: true,
        fundamentalsError: '',
      };
    case GET_FUNDAMENTALS_SUCCESS:
      return {
        loadingFundamentals: false,
        fundamentals: action.payload.data,
      };
    case GET_FUNDAMENTALS_ERROR:
      return {
        loadingFundamentals: false,
        fundamentalsError: action.payload.error,
        fundamentals: {},
      };
    default:
      return state;
  }
};
