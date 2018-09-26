import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div>
        Sorry to see you go :(
      </div>
    );
  }
}

export default withRouter(Signout);
