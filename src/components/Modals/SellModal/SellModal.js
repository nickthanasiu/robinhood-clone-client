import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Checkmark from '../Checkmark';

import './style.scss';

class SellModal extends Component {
  constructor(props) {
    super(props);
    this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillUnmount() {
    const { displaySellModal, hideSellModal } = this.props;
    if (displaySellModal) {
      hideSellModal();
    }
  }

  handleCloseBtnClick() {
    this.props.hideSellModal();
    this.props.resetSellForm();
    this.redirect();
  }

  redirect() {
    this.props.history.push('/dashboard');
  }

  render() {
    const { numShares, company, sharesWorth } = this.props;
    return (
      <div className="sell-modal">
        <button
          className="close-btn"
          type="button"
          onClick={this.handleCloseBtnClick}
        >
          &times;
        </button>
        <div className="sell-modal-wrapper">

          <div className="checkmark-icon">
            <Checkmark />
          </div>

          <div className="message">
            <span className="message__congrats">
              Success!
            </span>
            <span className="message__body">
              {`
                You've just sold ${numShares} share(s) of
                ${company.name} stock worth $${sharesWorth.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
              `}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SellModal);
