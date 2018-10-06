import { connect } from 'react-redux';
import { hideSellModal } from '../../../actions/modals';
import SellModal from './SellModal';

const mapStateToProps = state => ({
  displaySellModal: state.modals.displaySellModal,
});

const mapDispatchToProps = dispatch => ({
  hideSellModal: () => dispatch(hideSellModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellModal);
