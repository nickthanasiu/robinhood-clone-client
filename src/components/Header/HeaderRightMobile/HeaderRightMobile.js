import React from 'react';
import { IconContext } from 'react-icons';
import { FaBars, FaTimes } from 'react-icons/fa';


const dropdownHidden = true;

const HeaderRightMobile = () => (
    <div className="header__right--mobile">
            <IconContext.Provider value={{ size: '2.5rem' }}>
              <div
                className="header__button"
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
);

export default HeaderRightMobile;