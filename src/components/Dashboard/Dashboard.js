import React, { Component } from 'react';
import Header from '../Header';
import Chart from './Chart';
import SideBar from './Sidebar';
import Newsfeed from './Newsfeed';
import { formatOpenPriceKey } from '../../util/market_data_util';
import requireAuth from '../requireAuth';

import './style.scss';

class Dashboard extends Component {
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
      getFollowedCompanies,
      getMyStocks,
      currentUserId,
    } = this.props;

    getFollowedCompanies(currentUserId);
    getMyStocks(currentUserId);
    this.calculateDailyChange();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.followedCompanies !== this.props.followedCompanies) {
      newProps.fetchFollowedArticles(newProps.followedCompanies);
    }

    if (newProps.myStocks !== this.props.myStocks) {
      const symbols = newProps.myStocks.map((stock) => {
        return stock.symbol;
      });
      newProps.getPortfolioIntraday(symbols)
        .then(() => {
          this.calculateDailyChange();
        });
    }
  }

  calculateDailyChange() {
    const { portfolioIntradayData } = this.props;
    const today = new Date(Date.now());
    const openPriceKey = formatOpenPriceKey(today);
    const openPrice = portfolioIntradayData[openPriceKey];
    const latestPrice = Object.values(portfolioIntradayData)[0];
    const dailyChange = (latestPrice - openPrice);
    const dailyChangePercentage = ((dailyChange / openPrice) * 100);
    const changePositive = dailyChange >= 0 ? true : false;
    const fillColor = dailyChange >= 0 ? '#30cd9a' : '#f68f7c';

    this.setState({
      dailyChange: dailyChange.toFixed(2),
      dailyChangePercentage: dailyChangePercentage.toFixed(2),
      changePositive,
      fillColor,
    });
  }

  render() {
    const {
      followedCompanies,
      selectedCompany,
      searchCompanies,
      myStocks,
      loadingMyStocks,
      currentUserId,
      articles,
      loadingArticles,
      intradayData
    } = this.props;

    const {
      dailyChange,
      dailyChangePercentage,
      fillColor,
    } = this.state;


    

    

    return (
      <div className="dashboard">
        <div className="column__left">
          <div className="row__top">
            

            <div className="chart-section">
              <Chart
                fillColor={fillColor}
                dailyChange={dailyChange}
                dailyChangePercentage={dailyChangePercentage}
              />
            </div>
          </div>

          <div className="row__middle--mobile">
            <div className="sidebar-container--mobile">
              <SideBar
                searchCompanies={searchCompanies}
                selectedCompany={selectedCompany}
                followedCompanies={followedCompanies}
                myStocks={myStocks}
                loadingMyStocks={loadingMyStocks}
                currentUserId={currentUserId}
                intradayData={intradayData}
                fillColor={fillColor}
              />
            </div>
          </div>

          <div className="newsfeed-container column-left row__bottom">
            <Newsfeed
              articles={articles}
              loadingArticles={loadingArticles}
            />
          </div>
        </div>

        <div className="column__right">
          <div className="sidebar-container">
            <SideBar
              searchCompanies={searchCompanies}
              selectedCompany={selectedCompany}
              followedCompanies={followedCompanies}
              myStocks={myStocks}
              loadingMyStocks={loadingMyStocks}
              currentUserId={currentUserId}
              intradayData={intradayData}
              fillColor={fillColor}
            />
          </div>
        </div>
      </div>
    );
  }
}

const DashWithHeader = Header(Dashboard);

export default requireAuth(DashWithHeader);
