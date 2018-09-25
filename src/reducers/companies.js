import {
  COMPANY_SEARCH_BEGIN,
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_ERROR,
  FOLLOW_COMPANY_BEGIN,
  FOLLOW_COMPANY_SUCCESS,
  FOLLOW_COMPANY_ERROR,
  UNFOLLOW_COMPANY_BEGIN,
  UNFOLLOW_COMPANY_SUCCESS,
  UNFOLLOW_COMPANY_ERROR,
  FETCH_COMPANIES_BEGIN,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_ERROR,
  FETCH_FOLLOWED_COMPANIES_BEGIN,
  FETCH_FOLLOWED_COMPANIES_SUCCESS,
  FETCH_FOLLOWED_COMPANIES_ERROR,
} from '../actions/types';

// @TODO: selectedCompany should not be the entire company Object,
//        just the necessary data

const initialState = {
  loadingCompany: false,
  selectedCompany: {},
  companySearchError: '',
  loadingAllCompanies: false,
  allCompanies: [],
  allCompaniesError: '',
  loadingFollowedCompanies: false,
  followedCompanies: [],
  followedCompaniesError: '',
  followCompanyLoading: false,
  followCompanyError: '',
  unfollowCompanyLoading: false,
  unfollowCompanyError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_SEARCH_BEGIN:
      return {
        ...state,
        loadingCompany: true,
        companySearchError: '',
      };
    case COMPANY_SEARCH_SUCCESS:
      return {
        ...state,
        loadingCompany: false,
        selectedCompany: action.payload.data,
      };
    case COMPANY_SEARCH_ERROR:
      return {
        ...state,
        loadingCompany: false,
        companySearchError: action.payload.error,
        selectedCompany: {},
      };
    case FETCH_COMPANIES_BEGIN:
      return {
        ...state,
        loadingAllCompanies: true,
        allCompaniesError: '',
      };
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        loadingAllCompanies: false,
        allCompanies: action.payload.companies,
      };
    case FETCH_COMPANIES_ERROR:
      return {
        ...state,
        loadingAllCompanies: false,
        allCompaniesError: action.payload.error,
        allCompanies: [],
      };
    case FOLLOW_COMPANY_BEGIN:
      return {
        ...state,
        followCompanyLoading: true,
        followCompanyError: '',
      };
    case FOLLOW_COMPANY_SUCCESS:
      return {
        ...state,
        followCompanyLoading: false,
      };
    case FOLLOW_COMPANY_ERROR:
      return {
        ...state,
        followCompanyLoading: false,
        followCompanyError: action.payload.error,
      };
    case UNFOLLOW_COMPANY_BEGIN:
      return {
        ...state,
        unfollowCompanyLoading: true,
        unfollowCompanyError: '',
      };
    case UNFOLLOW_COMPANY_SUCCESS:
      return {
        ...state,
        unfollowCompanyLoading: false,
      };
    case UNFOLLOW_COMPANY_ERROR:
      return {
        ...state,
        unfollowCompanyLoading: false,
        unfollowCompanyError: action.payload.error,
      };
    case FETCH_FOLLOWED_COMPANIES_BEGIN:
      return {
        ...state,
        loadingFollowedCompanies: true,
        followedCompaniesError: '',
      };
    case FETCH_FOLLOWED_COMPANIES_SUCCESS:
      return {
        ...state,
        loadingFollowedCompanies: false,
        followedCompanies: action.payload.data,
      };
    case FETCH_FOLLOWED_COMPANIES_ERROR:
      return {
        ...state,
        loadingFollowedCompanies: false,
        followedCompaniesError: action.payload.error,
        followedCompanies: [],
      };
    default:
      return state;
  }
};
