import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Feather from '../Feather';
import SearchBar from './SearchBar';

import './style.scss';

export default (ChildComponent) => {
  class Header extends Component {
    renderLinks() {
      if (this.props.authenticated) {
        return (
          <div className="header-right">
            <Link to="/dashboard">
              Dashboard
            </Link>
            <Link to="/account">
              Account
            </Link>
            <Link to="/signout">
              Sign Out
            </Link>
          </div>
        );
      }

      return (
        <div className="header-right">
          <Link to="/">
            Home
          </Link>
          <Link to="/signup">
            Sign Up
          </Link>
          <Link to="/signin">
            Sign In
          </Link>
        </div>
      );
    }

    render() {
      return (
        <div className="composedComponent">
          <div className="header">
            <div className="header-left">
              <div className="brand">
                <Feather />
              </div>
              <div className="search">
                <SearchBar />
              </div>
            </div>

            {
              this.renderLinks()
            }

          </div>
          <div className="child-component-content">
            <ChildComponent {...this.props} />
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
  });

  return connect(mapStateToProps)(Header);
};
