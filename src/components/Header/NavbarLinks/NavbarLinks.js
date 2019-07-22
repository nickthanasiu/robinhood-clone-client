import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const NavbarLinks = () => (
    <div className="navbar-links">
        <div className="navbar-links__link-wrapper">
            <Link 
                to="/dashboard"
                className="navbar-links__link"
            >
                Dashboard
            </Link>
        </div>
        <div className="navbar-links__link-wrapper">
            <a
                href="#account-menu"
                rel="nofollow noopener"
                className="navbar-links__link"
            >
                Account
            </a>
        </div>
    </div>
);

export default NavbarLinks;