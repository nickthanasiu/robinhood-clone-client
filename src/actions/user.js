/* eslint-disable */
import axios from 'axios';
import { GET_USER_NAME_BEGIN, GET_USER_NAME_SUCCESS, GET_USER_NAME_ERROR } from './types';

//const API_URL = 'https://doohnibor-server.herokuapp.com/api';
const API_URL = 'http://localhost:8000/api';

const getUsernameBegin = () => ({
  type: GET_USER_NAME_BEGIN
});

const getUsernameSuccess = username => ({
  type: GET_USER_NAME_SUCCESS,
  payload: { username }
});

const getUsernameError = error => ({
  type: GET_USER_NAME_ERROR,
  payload: { error }
});

export const getUsername = currentUserId => async (dispatch) => {
  try {
    dispatch(getUsernameBegin());

    const response = await axios.post(`${API_URL}/get_user_name`, { currentUserId });
    dispatch(getUsernameSuccess(response.data));
  } catch (err) {
    dispatch(getUsernameError(err));
  }
};
