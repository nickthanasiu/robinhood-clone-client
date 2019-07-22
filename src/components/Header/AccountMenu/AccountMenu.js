import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

// Styles
import './style.scss';

const AccountMenu = ({
    loadingUsername,
    username,
    portfolioValue,
    loadingBuyingPower,
    buyingPower
}) => {
    return (
        <div id='account-menu'>
            <a href="#" className="close"></a>
            <header className="account-menu__header">
                <h3 className="account-menu__username">
                    { loadingUsername ? '' : `${username}`}
                </h3>
                <div className="account-menu__account-info-container">
                    <div className="account-menu__account-info">
                        <span className="account-menu__monetary-value">
                        {`$${portfolioValue}`}
                        </span>
                        <span className="account-menu__info-label">
                            Portfolio Value
                        </span>
                    </div>
                    <div className="account-menu__account-info">
                        <span className="account-menu__monetary-value">
                            { loadingBuyingPower ? '' : `$${buyingPower} `}
                        </span>
                        <span className="account-menu__info-label">
                            Buying Power
                        </span>
                    </div>
                </div>
            </header>
            <div className="account-menu__links">
                <Link 
                    to="signout"
                    className="account-menu__link"
                >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                </Link>
            </div>
        </div>
    );
};

AccountMenu.propTypes = {
    loadingUsername: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    portfolioValue: PropTypes.string.isRequired,
    loadingBuyingPower: PropTypes.bool.isRequired,
    buyingPower: PropTypes.string,
};

export default AccountMenu;