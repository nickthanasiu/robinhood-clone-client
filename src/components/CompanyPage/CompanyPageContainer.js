import { connect } from 'react-redux';
import { getLatestPrice, getIntraday } from '../../actions/marketData';
import { getFundamentals } from '../../actions/fundamentals';
import CompanyPage from './CompanyPage';

const mapStateToProps = state => ({
  selectedCompany: state.companies.selectedCompany,
  latestPrice: state.marketData.latestPrice,
  loadingLatestPrice: state.marketData.loadingLatestPrice,
  loadingIntraday: state.marketData.loadingIntraday,
  intradayData: state.marketData.intradayData,
  loadingFundamentals: state.fundamentals.loadingFundamentals,
  fundamentals: state.fundamentals.fundamentals,
});

const mapDispatchToProps = dispatch => ({
  getLatestPrice: symbol => dispatch(getLatestPrice(symbol)),
  getIntraday: symbol => dispatch(getIntraday(symbol)),
  getFundamentals: symbol => dispatch(getFundamentals(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);
