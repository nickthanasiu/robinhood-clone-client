/*eslint-disable*/
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import './style.scss';



const chartOptions = {
  legend: {
    display: false
  },
  responsive: true,
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  scales: {
    xAxes: [{
      display: false,
    }],
    yAxes: [{
      display: false,
      gridLines: {
        display: false,
      }
    }],
  },
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSeries: 'Today',
      changePositive: true,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.portfolioIntradayData !== this.props.portfolioIntradayData)
    console.log('chart props: ', newProps.portfolioIntradayData);
  }

  setChartData = (data) => {
    const borderColor = this.props.fillColor;
    const chartData = {
      labels: Object.keys(data),
      datasets: [{
        label: 'Your Portfolio',
        fill: false,
        lineTension: 0.1,
        borderColor: borderColor,
        borderWidth: 2,
        pointRadius: 1,
        data: Object.values(data),
      }]
    }

    return chartData;
  }

  /*
  
  <asd className="dashboard-header">
              <h2 className="portfolio-value">
                {
                  loadingPortfolio ? '' :
                    `
                      $${portfolioValue}
                    `
                }
              </h2>
              <span className="value-change">
                {
                  loadingPortfolioIntra
                    ? ''
                    : isNaN(dailyChange)
                      ? ''
                      : isNaN(dailyChangePercentage)
                        ? ''
                        : dailyChangeSpan
                }
                {
                  loadingPortfolioIntra ? '' : timespan
                }
              </span>
            </div>
  */

  render() {
    const { portfolioIntradayData } = this.props;
    const { changePositive } = this.state;
    const operator = changePositive ? '+' : '-';

    return (
      <div className="chart-wrapper">
        <header className="chart-header">
          <h1 className="chart-header__portfolio-value">
            $6.41
          </h1>
          <div className="chart-header__portfolio-value-change">
            +$0.09 (1.41%)
            <span className="chart-header__portfolio-value-change-timespan">
              Today
            </span>
          </div>
        </header>
        <div className="chart-main">
          <Line height={100} data={this.setChartData(portfolioIntradayData)} options={chartOptions} />
        </div>
      </div>
    );
  }
}

export default Chart;
