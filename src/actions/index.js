import axios from 'axios';

import {
  AUTH_USER,
  AUTH_ERROR,
  CURRENT_USER,
  SIGN_OUT,

} from './types';

const AUTH_URL = 'https://doohnibor-server.herokuapp.com';

const currentUser = currentUserId => ({
  type: CURRENT_USER,
  payload: { currentUserId }
});

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${AUTH_URL}/signup`, formProps);
    const { token, currentUserId } = response.data;
    dispatch({
      type: AUTH_USER,
      payload: token
    });
    localStorage.setItem('token', token);
    dispatch(currentUser(currentUserId));

    callback();
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Missing required field(s) or this e-mail is already in use',
    });
  }
};

const signinHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${AUTH_URL}/signin`, formProps, { signinHeaders });
    const { token, currentUserId } = response.data;
    console.log('currentUserId: ', currentUserId);
    console.log('token: ', token);
    dispatch({
      type: AUTH_USER,
      payload: token,
    })
    localStorage.setItem('token', token);
    dispatch(currentUser(currentUserId));

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
