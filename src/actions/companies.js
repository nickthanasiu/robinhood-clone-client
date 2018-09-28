import axios from 'axios';

import {
  COMPANY_SEARCH_BEGIN,
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_ERROR,
  FETCH_COMPANIES_BEGIN,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_ERROR,
  FOLLOW_COMPANY_BEGIN,
  FOLLOW_COMPANY_SUCCESS,
  FOLLOW_COMPANY_ERROR,
  UNFOLLOW_COMPANY_BEGIN,
  UNFOLLOW_COMPANY_SUCCESS,
  UNFOLLOW_COMPANY_ERROR,
  FETCH_FOLLOWED_COMPANIES_BEGIN,
  FETCH_FOLLOWED_COMPANIES_SUCCESS,
  FETCH_FOLLOWED_COMPANIES_ERROR,
} from './types';

const API_URL = 'https://doohnibor-server.herokuapp.com/api';

const companySearchBegin = () => ({
  type: COMPANY_SEARCH_BEGIN
});

const companySearchSuccess = data => ({
  type: COMPANY_SEARCH_SUCCESS,
  payload: { data }
});

const companySearchError = error => ({
  type: COMPANY_SEARCH_ERROR,
  payload: { error }
});

export const searchCompanies = (query, callback) => async (dispatch) => {
  try {
    dispatch(companySearchBegin());

    const response = await axios.post(`${API_URL}/search_companies`, {
      name: query,
      symbol: query
    });

    dispatch(companySearchSuccess(response.data[0]));
    callback();
  } catch (err) {
    dispatch(companySearchError(err));
  }
};

const getCompaniesBegin = () => ({
  type: FETCH_COMPANIES_BEGIN,
});

const getCompaniesSuccess = companies => ({
  type: FETCH_COMPANIES_SUCCESS,
  payload: { companies },
});

const getCompaniesError = error => ({
  type: FETCH_COMPANIES_ERROR,
  payload: { error },
});

export const getCompanies = () => async (dispatch) => {
  try {
    dispatch(getCompaniesBegin());

    const response = await axios.get(`${API_URL}/get_companies`);
    dispatch(getCompaniesSuccess(response.data));
  } catch (err) {
    dispatch(getCompaniesError(err));
  }
};

const followCompanyBegin = () => ({
  type: FOLLOW_COMPANY_BEGIN
});

const followCompanySuccess = () => ({
  type: FOLLOW_COMPANY_SUCCESS
});

const followCompanyError = error => ({
  type: FOLLOW_COMPANY_ERROR,
  payload: { error }
});

export const followCompany = (currentUserId, companyId) => async (dispatch) => {
  try {
    dispatch(followCompanyBegin());

    await axios.post(`${API_URL}/follow_company`, {
      currentUserId,
      companyId
    });

    dispatch(followCompanySuccess());
  } catch (err) {
    dispatch(followCompanyError(err));
  }
};

const unfollowCompanyBegin = () => ({
  type: UNFOLLOW_COMPANY_BEGIN
});

const unfollowCompanySuccess = () => ({
  type: UNFOLLOW_COMPANY_SUCCESS
});

const unfollowCompanyError = error => ({
  type: UNFOLLOW_COMPANY_ERROR,
  payload: { error }
});

export const unfollowCompany = (currentUserId, companyId) => async (dispatch) => {
  try {
    dispatch(unfollowCompanyBegin());

    await axios.post(`${API_URL}/unfollow_company`, {
      currentUserId,
      companyId
    });

    dispatch(unfollowCompanySuccess());
  } catch (err) {
    dispatch(unfollowCompanyError(err));
  }
};

const getFollowedBegin = () => ({
  type: FETCH_FOLLOWED_COMPANIES_BEGIN
});

const getFollowedSuccess = data => ({
  type: FETCH_FOLLOWED_COMPANIES_SUCCESS,
  payload: { data }
});

const getFollowedError = error => ({
  type: FETCH_FOLLOWED_COMPANIES_ERROR,
  payload: { error }
});

export const getFollowedCompanies = currentUserId => async (dispatch) => {
  try {
    dispatch(getFollowedBegin());

    const response = await axios.post(`${API_URL}/get_followed_companies`, { currentUserId });
    dispatch(getFollowedSuccess(response.data));
  } catch (err) {
    dispatch(getFollowedError(err));
  }
};
