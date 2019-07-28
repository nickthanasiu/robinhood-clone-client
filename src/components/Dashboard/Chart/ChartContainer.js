import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component to wrap
import Chart from './Chart';

class ChartContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Chart {...this.props} />
        );
    }
}

export default connect(null)(ChartContainer);