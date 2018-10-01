import { connect } from 'react-redux';
import { searchCompanies, getFollowedCompanies } from '../../actions/companies';
import { getMyStocks } from '../../actions/stocks';
import { fetchFollowedArticles } from '../../actions/newsfeed';
import { getPortfolioIntraday } from '../../actions/portfolio';
import Dashboard from './Dashboard';

const mapStateToProps = state => ({
  followedCompanies: state.companies.followedCompanies,
  selectedCompany: state.companies.selectedCompany,
  myStocks: state.stocks.myStocks,
  loadingMyStocks: state.stocks.loadingMyStocks,
  currentUserId: state.auth.currentUserId,
  articles: state.newsfeed.articles,
  loadingArticles: state.newsfeed.loadingArticles,
  loadingPortfolio: state.portfolio.loadingPortfolio,
  portfolioIntradayData: state.portfolio.portfolioIntradayData,
  loadingPortfolioIntra: state.portfolio.loadingPortfolioIntra,
  intradayData: state.marketData.intradayData,
});

const mapDispatchToProps = dispatch => ({
  getFollowedCompanies: currentUserId => dispatch(getFollowedCompanies(currentUserId)),
  getMyStocks: currentUserId => dispatch(getMyStocks(currentUserId)),
  fetchFollowedArticles: queryArray => dispatch(fetchFollowedArticles(queryArray)),
  getPortfolioIntraday: symbols => dispatch(getPortfolioIntraday(symbols)),
  searchCompanies: (query, callback) => dispatch(searchCompanies(query, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
