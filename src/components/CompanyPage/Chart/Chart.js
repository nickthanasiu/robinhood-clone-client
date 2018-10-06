/*eslint-disable*/
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

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
        display: true,
      }
    }],
  },
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSeries: 'Today',
    };

    this.setChartData = this.setChartData.bind(this);
  }


  setChartData(data) {
    const borderColor = this.props.fillColor;
    const chartData = {
      labels: Object.keys(data).reverse(),
      datasets: [{
        label: this.props.selectedCompany.name,
        fill: false,
        lineTension: 0.1,
        borderColor: borderColor,
        borderWidth: 2,
        pointRadius: 0,
        data: Object.values(data).reverse(),
      }]
    }

    return chartData;
  }

  render() {
    const { intradayData } = this.props;
    return (
      <div className="chart">
        <div className="chart-wrapper">
          <Line height={75} data={this.setChartData(intradayData)} options={chartOptions} />
        </div>
      </div>
    );
  }
}

export default Chart;
