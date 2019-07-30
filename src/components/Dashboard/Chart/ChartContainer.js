import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/portfolio';

//  Selector functions
import { getTimespan } from '../../../reducers';

// Component to wrap
import Chart from './Chart';

class ChartContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changePositive: true,
          };
    }

    setChartData = data => {
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

    render() {
        return (
            <Chart
                {...this.props}
                {...this.state} 
                setChartData={this.setChartData}
                timeseriesSelector={this.timeseriesSelector}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const filter = ownProps.selectedTimeSeries || '1D';

    return {
        selectedTimeSeries: state.portfolio.selectedTimeSeries,
        loadingPortfolio: state.portfolio.loadingPortfolio,
        portfolioValue: state.portfolio.portfolioValue,
        loadingPortfolioIntra: state.portfolio.loadingPortfolioIntra,
        portfolioIntradayData: state.portfolio.portfolioIntradayData,
        timespan: getTimespan(state),
        //portfolioData: getPortfolioData(state, filter)
    };
};

export default connect(mapStateToProps, actions)(ChartContainer);