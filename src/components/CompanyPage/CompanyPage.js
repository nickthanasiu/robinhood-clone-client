import React, { Component } from 'react';
import Header from '../Header';
import Chart from './Chart';
import Newsfeed from './Newsfeed';
import SidebarContainer from './Sidebar';

import { formatOpenPriceKey } from '../../util/market_data_util';

import './style.scss';

class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyChange: '',
      dailyChangePercentage: '',
      changePositive: true,
      fillColor: '#30cd9a',
    };

    this.calculateDailyChange = this.calculateDailyChange.bind(this);
  }

  componentDidMount() {
    const {
      getLatestPrice,
      latestPrice,
      getIntraday,
      selectedCompany
    } = this.props;
    getLatestPrice(selectedCompany.symbol);
    getIntraday(selectedCompany.symbol)
      .then(() => {
        this.calculateDailyChange();
      });
  }

  componentWillReceiveProps(newProps) {
    const { getIntraday, selectedCompany } = newProps;
    if (newProps.latestPrice !== this.props.latestPrice) {
      getIntraday(selectedCompany.symbol)
        .then(() => {
          this.calculateDailyChange();
        });
    }
  }

  calculateDailyChange() {
    const { intradayData, latestPrice } = this.props;
    const today = new Date(Date.now());
    const openPriceKey = formatOpenPriceKey(today);
    const openPrice = parseFloat(intradayData[openPriceKey], 10);
    const dailyChange = latestPrice - openPrice;
    const dailyChangePercentage = ((dailyChange / openPrice) * 100);
    const changePositive = dailyChange >= 0 ? true : false;
    const fillColor = dailyChange >= 0 ? '#30cd9a' : '#f68f7c';

    this.setState({
      dailyChange: dailyChange.toFixed(2).toLocaleString('en', { minimumFractionDigits: 2 }),
      dailyChangePercentage: dailyChangePercentage.toFixed(2).toLocaleString('en', { minimumFractionDigits: 2 }),
      changePositive,
      fillColor,
    });
  }

  render() {
    const {
      selectedCompany,
      latestPrice,
      loadingLatestPrice,
      intradayData,
      loadingIntraday,
      buyingPower,
    } = this.props;

    const {
      dailyChange,
      dailyChangePercentage,
      changePositive,
      fillColor,
    } = this.state;

    const operator = changePositive ? '+' : '-';

    const dailyChangeSpan = `
      ${operator}$${Math.abs(dailyChange)} (${dailyChangePercentage}%)
    `;

    const timespan = (
      <span className="timespan">
        Today
      </span>
    );

    const renderConditions = loadingLatestPrice || loadingIntraday;

    return (
      <div className="company-page">
        <div className="column-left">
          <div className="company-header">
            <h2 className="company-name">
              { selectedCompany.name }
            </h2>
            <h2 className="company-price">
              {
                loadingLatestPrice
                  ? ''
                  : `$${latestPrice.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
            </h2>

            <span className="price-change">
              {
                loadingIntraday ? null : dailyChangeSpan
              }
              {
                loadingIntraday ? null : timespan
              }
            </span>
          </div>

          <div className="chart-container">
            {
              loadingIntraday ? null : (
                <Chart
                  selectedCompany={selectedCompany}
                  fillColor={fillColor}
                  intradayData={intradayData}
                />
              )
            }
          </div>

          <div className="company-about">
            <h3>
              About
            </h3>

            <p className="company-description">
              { selectedCompany.description }
            </p>

            <div className="company-about-grid">

              <div className="grid-col">
                <div className="company-ceo">
                  <span className="label">
                    CEO
                  </span>
                  <span>
                    { selectedCompany.ceo }
                  </span>
                </div>
                <div className="company-market-cap">
                  <span className="label">
                    Market Cap
                  </span>
                  <span>
                    { selectedCompany.marketCap }
                  </span>
                </div>
              </div>

              <div className="grid-col">
                <div className="company-employees">
                  <span className="label">
                    Employees
                  </span>
                  <span>
                    { selectedCompany.employees }
                  </span>
                </div>
                <div className="company-price-earnings-ratio">
                  <span className="label">
                    Price-Earnings Ratio
                  </span>
                  <span>
                    { selectedCompany.priceEarningsRatio }
                  </span>
                </div>
              </div>

              <div className="grid-col">
                <div className="company-hq">
                  <span className="label">
                    Headquarters
                  </span>
                  <span>
                    { selectedCompany.hq }
                  </span>
                </div>
                <div className="company-dividend-yield">
                  <span className="label">
                    Dividend Yield
                  </span>
                  <span>
                    { selectedCompany.dividendYield }
                  </span>
                </div>
              </div>

              <div className="grid-col">
                <div className="company-founded">
                  <span className="label">
                    Founded
                  </span>
                  <span>
                    { selectedCompany.founded }
                  </span>
                </div>
                <div className="company-average-volume">
                  <span className="label">
                    Average Volume
                  </span>
                  <span>
                    { selectedCompany.averageVolume }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="newsfeed-container">
            <Newsfeed
              company={selectedCompany}
            />
          </div>
        </div>

        <div className="column-right">
          {
            loadingIntraday ? null : (
              <div className="sidebar-container">
                <SidebarContainer
                  selectedCompany={selectedCompany}
                  latestPrice={latestPrice}
                  loadingLatestPrice={loadingLatestPrice}
                  fillColor={fillColor}
                  buyingPower={buyingPower}
                />
              </div>
            )
          }
        </div>
      </div>
    );
  }
};

const CompanyPageWithHeader = Header(CompanyPage);

export default CompanyPageWithHeader;
