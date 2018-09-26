import { connect } from 'react-redux';
import { getLatestPrice, getIntraday } from '../../actions/marketData';
import CompanyPage from './CompanyPage';

const mapStateToProps = state => ({
  selectedCompany: state.companies.selectedCompany,
  latestPrice: state.marketData.latestPrice,
  loadingLatestPrice: state.marketData.loadingLatestPrice,
  loadingIntraday: state.marketData.loadingIntraday,
  intradayData: state.marketData.intradayData,
});

const mapDispatchToProps = dispatch => ({
  getLatestPrice: symbol => dispatch(getLatestPrice(symbol)),
  getIntraday: symbol => dispatch(getIntraday(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);
