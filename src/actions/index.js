import axios from 'axios';
import { AUTH_URL } from '../api';

import {
  AUTH_USER,
  AUTH_ERROR,
  CURRENT_USER,
  SIGN_OUT,
} from './types';

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${AUTH_URL}/signup`, formProps);
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    localStorage.setItm('token', response.data.token);
    callback();
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Missing required field(s) or this e-mail is already in use',
    });
  }
};


const currentUser = currentUserId => ({
  type: CURRENT_USER,
  payload: { currentUserId }
});

const signinHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${AUTH_URL}/signin`, formProps, { signinHeaders });
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    localStorage.setItem('token', response.data.token);
    dispatch(currentUser(response.data.currentUserId));
    callback();
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid login credentials',
    });
  }
};

export const signout = () => {
  // Remove auth token from localStorage when user signs out
  localStorage.removeItem('token');

  return {
    type: SIGN_OUT
  };
};
