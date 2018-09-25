import { AUTH_USER, AUTH_ERROR, CURRENT_USER } from '../actions/types';

const initialState = {
  authenticated: '',
  errorMessage: '',
  currentUserId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CURRENT_USER:
      return {
        ...state,
        currentUserId: action.payload.currentUserId,
      };
    default:
      return state;
  }
};
