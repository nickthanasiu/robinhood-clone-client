import React, { Component } from 'react';
import { FaCheckSquare } from 'react-icons/fa';

import './style.scss';

class SellModal extends Component {
  render() {
    return (
      <div className="sell-modal">
        <div className="checkmark-icon">
          <FaCheckSquare />
        </div>

        <div className="message">
          Success!
        </div>
      </div>
    );
  }
}

export default SellModal;
