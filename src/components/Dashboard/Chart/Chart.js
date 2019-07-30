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

function Chart ({
  loadingPortfolio,
  portfolioValue,
  loadingPortfolioIntra,
  portfolioIntradayData,
  changePositive,
  timeseriesSelector,
  selectedTimeSeries,
  dailyChange,
  dailyChangePercentage,
  timespan,
  setChartData
}){
  const selected_btn_style = { borderBottom: `2px solid ${$green}` };
  const operator = changePositive ? '+' : '-';
  const dailyChangeSpan =`
      ${operator}$${Math.abs(dailyChange)} (${dailyChangePercentage}%)
    `;
  return (
    <div className="chart-wrapper">
        <header className="chart-header">
          <h1 className="chart-header__portfolio-value">
            {
              loadingPortfolio ? '' : `$${portfolioValue}`
            }
          </h1>
          <div className="chart-header__portfolio-value-change">
            {
              loadingPortfolioIntra
                    ? ''
                    : isNaN(dailyChange)
                      ? ''
                      : isNaN(dailyChangePercentage)
                        ? ''
                        : dailyChangeSpan
            }
            <span className="chart-header__portfolio-value-change-timespan">
              { loadingPortfolioIntra ? '' : timespan }
            </span>
          </div>
        </header>
        <div className="chart-main">
          <Line height={100} data={setChartData(portfolioIntradayData)} options={chartOptions} />
        </div>

        <div className="chart-timeseries-buttons">
          <span
            className="chart-timeseries-buttons__button 1D"
            style={ selectedTimeSeries === '1D' ? selected_btn_style : {} }
            onClick={timeseriesSelector}
          >
            1D
          </span>
          <span
            className="chart-timeseries-buttons__button 1W"
            style={ selectedTimeSeries === '1W' ? selected_btn_style : {} }
            onClick={timeseriesSelector}
          >
            1W
          </span>
          <span
            className="chart-timeseries-buttons__button 1M"
            style={ selectedTimeSeries === '1M' ? selected_btn_style : {} }
            onClick={timeseriesSelector}
          >
            1M
          </span>
        </div>
      </div>
  );
};

export default Chart;
