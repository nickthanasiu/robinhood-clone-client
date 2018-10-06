import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaTimes, FaCheckSquare } from 'react-icons/fa';

import './style.scss';

class SellModal extends Component {
  constructor(props) {
    super(props);
    this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
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
  }

  render() {
    const { numShares, company, sharesWorth } = this.props;
    return (
      <div className="sell-modal">
        <IconContext.Provider value={{ size: '1.4em', color: '#f68f7c' }}>
          <button
            className="close-btn"
            type="button"
            onClick={this.handleCloseBtnClick}
          >
            <FaTimes />
          </button>
        </IconContext.Provider>
        <div className="sell-modal-wrapper">

          <IconContext.Provider value={{ size: '5em', color: '#30cd9a' }}>
            <div className="checkmark-icon">
              <FaCheckSquare />
            </div>
          </IconContext.Provider>

          <div className="message">
            <span className="message__congrats">
              Congratulations!
            </span>
            <span className="message__body">
              {`
                You've just sold ${numShares} share(s) of
                ${company.name} stock worth $${sharesWorth}
              `}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default SellModal;
