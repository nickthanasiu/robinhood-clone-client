import {
  FETCH_ARTICLES_BEGIN,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../actions/types';

const initialState = {
  articles: [],
  loadingArticles: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return {
        ...state,
        loadingArticles: true,
        error: null,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loadingArticles: false,
        articles: action.payload.articles,
      };
    case FETCH_ARTICLES_ERROR:
      return {
        ...state,
        loadingArticles: false,
        error: action.payload.error,
        articles: [],
      };
    default:
      return state;
  }
};
