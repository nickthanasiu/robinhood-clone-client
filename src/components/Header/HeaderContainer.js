import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export connect(mapStateToProps)(Header);
