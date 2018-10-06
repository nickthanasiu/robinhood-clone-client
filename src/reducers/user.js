import { GET_USER_NAME_BEGIN, GET_USER_NAME_SUCCESS, GET_USER_NAME_ERROR } from '../actions/types';

const initialState = {
  username: '',
  loadingUsername: false,
  usernameError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_NAME_BEGIN:
      return {
        ...state,
        usernameError: '',
        loadingUsername: true,
      };
    case GET_USER_NAME_SUCCESS:
      return {
        ...state,
        loadingUsername: false,
        username: action.payload.username,
      };
    case GET_USER_NAME_ERROR:
      return {
        ...state,
        loadingUsername: false,
        usernameError: action.payload.error,
        username: '',
      };
    default:
      return state;
  }
};
