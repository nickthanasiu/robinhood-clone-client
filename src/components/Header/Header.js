import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { getPortfolioValue } from '../../actions/portfolio';
import { getUsername } from '../../actions/user';
import { getBuyingPower } from '../../actions/stocks';

import Feather from '../Feather';
import MobileFeather from '../MobileFeather';
import SearchBar from './SearchBar';

import './style.scss';

export default (ChildComponent) => {
  class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdownHidden: true,
      };

      this.dropdown = this.dropdown.bind(this);
      this.handleMenuClick = this.handleMenuClick.bind(this);
      this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
    }

    componentDidMount() {
      const { getPortfolioValue, getUsername, currentUserId } = this.props;
      getPortfolioValue(currentUserId);
      getUsername(currentUserId);
    }

    componentWillReceiveProps(newProps) {
      const { getBuyingPower, portfolioValueAsNum } = newProps;
      if (portfolioValueAsNum !== this.props.portfolioValueAsNum) {
        getBuyingPower(portfolioValueAsNum);
      }
    }

    dropdown() {
      this.setState({
        dropdownHidden: !this.state.dropdownHidden
      });
    }

    handleMenuClick() {
      this.dropdown();
    }

    handleCloseBtnClick() {
      this.dropdown();
    }

    renderLinks() {
      const { dropdownHidden } = this.state;
      const {
        portfolioValue,
        buyingPower,
        loadingBuyingPower,
        username,
        loadingUsername
      } = this.props;

      if (this.props.authenticated) {
        return (
          <div className="header__auth">
            <div className="header__right">
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
                    {
                      loadingUsername ? '' : `${username}`
                    }
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
                          loadingBuyingPower ? '' : `$${buyingPower}`
                        }
                      </span>
                      <span>
                         Buying Power
                      </span>
                    </span>
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

            <div className="header__right--mobile">
              <IconContext.Provider value={{ size: '2.5rem' }}>
                <div
                  className="header__button"
                  onClick={this.handleMenuClick}
                >
                  <FaBars />
                </div>
              </IconContext.Provider>
              <div className="account-menu-container">
                <ul className={`account-menu ${dropdownHidden ? 'dropdown-hidden' : null}`}>
                  <div className="search--mobile">
                    <SearchBar />
                  </div>
                  <li className="account-user">
                    {
                      loadingUsername ? '' : `${username}`
                    }
                    <IconContext.Provider value={{ size: '1.5rem', color: '#f68f7c' }}>
                      <div
                        className="menu-close-btn"
                        onClick={this.handleCloseBtnClick}
                      >
                        <FaTimes />
                      </div>
                    </IconContext.Provider>
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
                          loadingBuyingPower ? '' : `$${buyingPower}`
                        }
                      </span>
                      <span>
                         Buying Power
                      </span>
                    </span>
                  </li>
                  <li className="dashboard-link">
                    <Link to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="signout">
                    <Link to="/signout">
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="header__right">
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
            <div className="header__left">
              <div className="brand">
                <Feather />
              </div>
              <div className="search">
                <SearchBar />
              </div>
            </div>
            <div className="header__left--mobile">
              <div className="brand">
                <MobileFeather />
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
    portfolioValueAsNum: state.portfolio.portfolioValueAsNum,
    currentUserId: state.auth.currentUserId,
    username: state.user.username,
    loadingUsername: state.user.loadingUsername,
    buyingPower: state.stocks.buyingPower,
    loadingBuyingPower: state.stocks.loadingBuyingPower,
  });

  const mapDispatchToProps = dispatch => ({
    getPortfolioValue: currentUserId => dispatch(getPortfolioValue(currentUserId)),
    getBuyingPower: currentUserId => dispatch(getBuyingPower(currentUserId)),
    getUsername: currentUserId => dispatch(getUsername(currentUserId)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
