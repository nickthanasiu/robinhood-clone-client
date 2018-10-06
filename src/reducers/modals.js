import {
  SHOW_BUY_MODAL,
  HIDE_BUY_MODAL,
  SHOW_SELL_MODAL,
  HIDE_SELL_MODAL,
} from '../actions/types';

const initialState = {
  displayBuyModal: false,
  displaySellModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_BUY_MODAL:
      return {
        ...state,
        displayBuyModal: true,
      };
    case HIDE_BUY_MODAL:
      return {
        ...state,
        displayBuyModal: false,
      };
    case SHOW_SELL_MODAL:
      return {
        ...state,
        displaySellModal: true,
      };
    case HIDE_SELL_MODAL:
      return {
        ...state,
        displaySellModal: false,
      };
    default:
      return state;
  }
};
