import { connect } from 'react-redux';
import { hideBuyModal } from '../../../actions/modals';
import BuyModal from './BuyModal';

const mapStateToProps = state => ({
  displayBuyModal: state.modals.displayBuyModal,
});

const mapDispatchToProps = dispatch => ({
  hideBuyModal: () => dispatch(hideBuyModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyModal);
