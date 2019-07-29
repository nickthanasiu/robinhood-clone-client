/*eslint-disable*/
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

// Styles
import './style.scss';
import { $green } from '../../../styles/colors';



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
    }]
  }
};

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.portfolioIntradayData !== this.props.portfolioIntradayData)
    console.log('chart props: ', newProps.portfolioIntradayData);
    console.log('full chart props: ', newProps);
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
        pointRadius: 0,
        data: Object.values(data),
      }]
    }

    return chartData;
  }

  timeseriesSelector = e =>
    this.props.setSelectedTimeseries(e.target.innerHTML);
    s

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
    const { portfolioIntradayData, changePositive, selectedTimeSeries } = this.props;
    const selected_btn_style = { borderBottom: `2px solid ${$green}` };
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

        <div className="chart-timeseries-buttons">
          <span
            className="chart-timeseries-buttons__button 1D"
            style={ selectedTimeSeries === '1D' ? selected_btn_style : {} }
            onClick={this.timeseriesSelector}
          >
            1D
          </span>
          <span
            className="chart-timeseries-buttons__button 1W"
            style={ selectedTimeSeries === '1W' ? selected_btn_style : {} }
            onClick={this.timeseriesSelector}
          >
            1W
          </span>
          <span
            className="chart-timeseries-buttons__button 1M"
            style={ selectedTimeSeries === '1M' ? selected_btn_style : {} }
            onClick={this.timeseriesSelector}
          >
            1M
          </span>
        </div>
      </div>
    );
  }
}

export default Chart;
