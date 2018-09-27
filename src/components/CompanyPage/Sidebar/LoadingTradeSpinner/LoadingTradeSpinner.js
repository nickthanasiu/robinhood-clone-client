import React, { Component } from 'react';
import { css } from 'react-emotion';
import { DotLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class LoadingTradeSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <div className="loading-spinner">
        <DotLoader
          className={override}
          sizeUnit={"rem"}
          size={1}
          color={'#fff'}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default LoadingTradeSpinner;
