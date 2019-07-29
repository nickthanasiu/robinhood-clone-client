import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/portfolio';

// Component to wrap
import Chart from './Chart';

class ChartContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changePositive: true,
          };
    }

    componentDidMount() {
        console.log('Chart Container Props: ', this.props);
    }
    render() {
        return (
            <Chart {...this.props} {...this.state} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const filter = ownProps.selectedTimeSeries || '1D';

    return {
        selectedTimeSeries: state.portfolio.selectedTimeSeries,
        portfolioIntradayData: state.portfolio.portfolioIntradayData,
        //portfolioData: getPortfolioData(state, filter)
    };
};

const mapDispatchToProps = dispatch => ({
    setSelectedTimeseries: timeseries => dispatch(setSelectedTimeseries(timeseries)),
});

export default connect(mapStateToProps, actions)(ChartContainer);