import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const chartOptions = {
  legend: {
    display: false
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

class MiniChart extends Component {
  constructor(props) {
    super(props);

    this.setChartData = this.setChartData.bind(this);
  }

  setChartData(data) {
    const chartData = {
      labels: Object.keys(data).reverse(),
      datasets: [{
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        borderColor: '#30cd9a',
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
          <Line height={150} data={this.setChartData(intradayData)} options={chartOptions} />
        </div>
      </div>
    );
  }
}

export default MiniChart;
