import {
  SHOW_BUY_MODAL,
  HIDE_BUY_MODAL,
  SHOW_SELL_MODAL,
  HIDE_SELL_MODAL,
} from './types';

export const showBuyModal = () => ({
  type: SHOW_BUY_MODAL
});

export const hideBuyModal = () => ({
  type: HIDE_BUY_MODAL
});

export const showSellModal = () => ({
  type: SHOW_SELL_MODAL
});


export const hideSellModal = () => ({
  type: HIDE_SELL_MODAL
});
