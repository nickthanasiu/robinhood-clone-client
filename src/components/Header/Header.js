import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { getPortfolioValue } from '../../actions/portfolio';
import { getBuyingPower } from '../../actions/stocks';

import Feather from '../Feather';
import SearchBar from './SearchBar';

import './style.scss';

export default (ChildComponent) => {
  class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdownHidden: true
      };

      this.dropdown = this.dropdown.bind(this);
    }

    componentDidMount() {
      console.log('HEADER MOUNTED WITH PROPS: ', this.props);
      const { getPortfolioValue, getBuyingPower, currentUserId } = this.props;
      getPortfolioValue(currentUserId);
      getBuyingPower(currentUserId);
    }

    dropdown() {
      this.setState({
        dropdownHidden: !this.state.dropdownHidden
      });
    }

    renderLinks() {
      const { dropdownHidden } = this.state;
      const { portfolioValue, buyingPower, loadingBuyingPower } = this.props;
      if (this.props.authenticated) {
        return (
          <div className="header-right">
            <li className="navbar-link">
              <Link to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className='navbar-link'>

              <li onClick={this.dropdown}>
                <a href="#">
                  Account
                </a>
              </li>
              <ul className={`account-menu ${dropdownHidden ? 'dropdown-hidden' : null}`}>
                <li className="account-user">
                  Nicholas Thanasiu
                </li>
                <li className="account-info">
                  <span className="portfolio-value">
                    <span>
                      {`
                        $${portfolioValue}
                      `}
                    </span>
                    <span>
                       Portfolio Value
                    </span>
                  </span>
                  <span className="buying-power">
                    <span>
                      {
                        loadingBuyingPower ? null : `$${buyingPower}`
                      }
                    </span>
                    <span>
                       Buying Power
                    </span>
                  </span>
                </li>
                <li className="account-link">
                  <FaUserAlt />
                  <Link to="/account">
                    Account
                  </Link>
                </li>
                <li className="signout">
                  <FaSignOutAlt />
                  <Link to="/signout">
                    Sign Out
                  </Link>
                </li>
              </ul>
            </li>

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
    portfolioValue: state.portfolio.portfolioValue,
    currentUserId: state.auth.currentUserId,
    buyingPower: state.stocks.buyingPower,
    loadingBuyingPower: state.stocks.loadingBuyingPower,
  });

  const mapDispatchToProps = dispatch => ({
    getPortfolioValue: currentUserId => dispatch(getPortfolioValue(currentUserId)),
    getBuyingPower: currentUserId => dispatch(getBuyingPower(currentUserId)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
