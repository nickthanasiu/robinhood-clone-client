import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Feather from '../Feather';

import './style.scss';

export default (ChildComponent) => {
  class Header extends Component {
    render() {
      return (
        <div className="composedComponent">
          <div className="header">
            <div className="header-left">
              <div className="brand">
                <Feather />
              </div>
              <div className="search">
                Search Bar Here
              </div>
            </div>
          </div>
          <div className="child-component-content">
            <ChildComponent {...this.props} />
          </div>
        </div>
      );
    }
  }
};
