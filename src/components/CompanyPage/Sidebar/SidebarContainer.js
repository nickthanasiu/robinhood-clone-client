import { connect } from 'react-redux';
import { followCompany, unfollowCompany } from '../../../actions/companies';
import { buyStock, sellStock } from '../../../actions/stocks';
import Sidebar from './Sidebar';

const mapStateToProps = state => ({
  currentUserId: state.auth.currentUserId,
  followedCompanies: state.companies.followedCompanies,
  myStocks: state.stocks.myStocks,
  buyStockLoading: state.stocks.buyStockLoading,
  sellStockLoading: state.stocks.sellStockLoading,
});

const mapDispatchToProps = dispatch => ({
  followCompany: (currentUserId, companyId) => dispatch(followCompany(currentUserId, companyId)),
  unfollowCompany: (currentUserId, companyId) => dispatch(unfollowCompany(currentUserId, companyId)),
  buyStock: (currentUserId, companyId, shares) => dispatch(buyStock(currentUserId, companyId, shares)),
  sellStock: (currentUserId, companyId, shares) => dispatch(sellStock(currentUserId, companyId, shares)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
