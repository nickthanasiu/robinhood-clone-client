import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MiniChart from './MiniChart';

import './style.scss';

// @TODO: Make Add mini chart to each Watchlist and Stock item

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleStockClick = this.handleStockClick.bind(this);
    this.handleWatchlistClick = this.handleWatchlistClick.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleStockClick(e) {
    e.preventDefault();
    const returnNode = e.currentTarget.childNodes;
    const companySymbol = returnNode[0].firstChild.textContent;

    this.redirect(companySymbol);
  }

  handleWatchlistClick(e) {
    e.preventDefault();
    const returnNode = e.currentTarget.childNodes;
    const companySymbol = returnNode[0].textContent;

    this.redirect(companySymbol);
  }

  redirect(symbol) {
    this.props.searchCompanies(symbol, () => {
      this.props.history.push('/company');
    });
  }

  render() {
    const { intradayData, loadingMyStocks } = this.props;
    return (
      <div className="sidebar-container">

        <div className="sidebar">
          <div className="stocks-list-header">
            Stocks
          </div>
          <ul className="stocks-list">
            {
              this.props.myStocks.map(stock => (
                <li
                  className="stocks-list-item"
                  key={stock.symbol}
                  onClick={this.handleClick}
                >
                  <div className="list-item-left">
                    <span className="company-symbol">
                      { stock.symbol }
                    </span>
                    <span className="company-shares">
                      {
                        stock.shares === 1 ?
                          `${stock.shares} Share` :
                          `${stock.shares} Shares`
                      }
                    </span>
                  </div>

                  <div className="mini-chart-container">
                    <MiniChart
                      intradayData={intradayData}
                    />
                  </div>

                  <div className="list-item-right">
                    <span className="company-price">
                      {
                        loadingMyStocks
                          ? ''
                          : `$${stock.value}`
                      }
                    </span>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className="watchlist-header">
            Watchlist
          </div>
          <ul className="watchlist">
            {
              this.props.followedCompanies.map(company => (
                <li
                  className="watchlist-item"
                  key={company.symbol}
                  onClick={this.handleWatchlistClick}
                >
                  <span className="company-symbol">
                    { company.symbol }
                  </span>
                  <span className="company-price">
                    $
                    { company.price.toFixed(2).toLocaleString('en', { minimumFractionDigits: 2 }) }
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
