import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Feather from '../Feather';
import MobileFeather from '../MobileFeather';
import SearchBar from './SearchBar';
import NavbarLinks from './NavbarLinks';
import HeaderRightMobile from './HeaderRightMobile';
import AccountMenu from './AccountMenu';

import './style.scss';

//@TODO: Make Font awesome icons work in Firefox on mobile devices
        // ...currently not sized properly

export default (ChildComponent) => {
  class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdownHidden: true,
      };

      //this.dropdown = this.dropdown.bind(this);
      //this.handleMenuClick = this.handleMenuClick.bind(this);
      //this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
    }

    /*dropdown() {
      this.setState({
        dropdownHidden: !this.state.dropdownHidden
      });
    }

    handleMenuClick() {
      this.dropdown();
    }

    handleCloseBtnClick() {
      this.dropdown();
    }*/

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
            <React.Fragment>
              <div className="header__right">
                <NavbarLinks />
                <AccountMenu />
              </div>
            {/*<HeaderRightMobile />*/}
            </React.Fragment>
          </div>
          <div className="child-component-content">
            <ChildComponent {...this.props} />
          </div>
        </div>
      );
    }
  }

  return Header;
};
