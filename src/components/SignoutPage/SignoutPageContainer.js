import { connect } from 'react-redux';
import { signout } from '../../actions';
import SignoutPage from './SignoutPage';

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout()),
});

export default connect(null, mapDispatchToProps)(SignoutPage);
