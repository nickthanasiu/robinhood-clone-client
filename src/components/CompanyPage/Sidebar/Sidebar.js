import React, { Component } from 'react';
import LoadingTradeSpinner from './LoadingTradeSpinner';
import BuyModal from '../../Modals/BuyModal';
import SellModal from '../../Modals/SellModal';

import './style.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watching: false,
      numShares: '',
      estimatedCost: (0).toFixed(2),
      estimatedCredit: (0).toFixed(2),
      orderSummaryDisplay: 'none',
      submitButtonDisplay: false,
      owned: false,
      sharesOwned: 0,
      buyActive: true,
      sellActive: false,
      inputActive: false,
    };

    this.displayBuyModal = this.displayBuyModal.bind(this);
    this.displaySellModal = this.displaySellModal.bind(this);
    this.updateNumShares = this.updateNumShares.bind(this);
    this.handleWatchButtonClick = this.handleWatchButtonClick.bind(this);
    this.watchCompany = this.watchCompany.bind(this);
    this.unwatchCompany = this.unwatchCompany.bind(this);
    this.handleBuyButtonClick = this.handleBuyButtonClick.bind(this);
    this.resetBuyForm = this.resetBuyForm.bind(this);
    this.handleSellButtonClick = this.handleSellButtonClick.bind(this);
    this.resetSellForm = this.resetSellForm.bind(this);
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.inputActive = this.inputActive.bind(this);
  }

  componentDidMount() {
    const { selectedCompany, followedCompanies, myStocks } = this.props;
    const index = followedCompanies.map((company) => {
      return company._id;
    }).indexOf(selectedCompany._id);
    if (index !== -1) {
      this.setState({
        watching: true
      });
    }

    const filterResult = myStocks.filter(stock => this.isCompanyOwned(stock));
    // Loop through myStocks to check if selectedCompany is owned by user
    if (filterResult.length === 1) {
      this.setState({
        owned: true,
        sharesOwned: filterResult[0].shares
      });
    }
  }

  componentWillUnmount() {
    const {
      displayBuyModal,
      displaySellModal,
      hideBuyModal,
      hideSellModal,
    } = this.props;

    if (displayBuyModal) {
      hideBuyModal();
    }

    if (displaySellModal) {
      hideSellModal();
    }
  }

  displayBuyModal() {
    setTimeout(() => {
      this.props.showBuyModal();
    }, 2000);
  }

  displaySellModal() {
    setTimeout(() => {
      this.props.showSellModal();
    }, 2000);
  }

  isCompanyOwned(company) {
    const { selectedCompany } = this.props;
    return company.symbol === selectedCompany.symbol;
  }

  updateNumShares() {
    this.setState({
      numShares: this.sharesInput.value
    });
  }

  // @TODO: Change all 'follow' actions to 'watch'

  handleWatchButtonClick() {
    // if following, unfollow, otherwise follow
    const { watching } = this.state;
    if (!watching) {
      this.watchCompany();
    } else {
      this.unwatchCompany();
    }
  }

  watchCompany() {
    const { followCompany, selectedCompany, currentUserId } = this.props;
    followCompany(currentUserId, selectedCompany._id);
    this.setState({
      watching: true
    });
  }

  unwatchCompany() {
    const { unfollowCompany, selectedCompany, currentUserId } = this.props;
    unfollowCompany(currentUserId, selectedCompany._id);
    this.setState({
      watching: false
    });
  }

  handleBuyButtonClick(e) {
    e.preventDefault();
    const { selectedCompany } = this.props;
    const { numShares } = this.state;
    this.setState({
      estimatedCost: (selectedCompany.price * numShares).toFixed(2),
      orderSummaryDisplay: 'flex',
      submitButtonDisplay: true,
    });
  }

  resetBuyForm() {
    this.setState({
      estimatedCost: '0',
      orderSummaryDisplay: 'none',
      submitButtonDisplay: false,
    });
  }

  handleSellButtonClick(e) {
    e.preventDefault();
    const { selectedCompany } = this.props;
    const { numShares } = this.state;

    if (numShares > 0) {
      this.setState({
        estimatedCredit: (selectedCompany.price * numShares).toFixed(2),
        orderSummaryDisplay: 'flex',
        submitButtonDisplay: true,
      });
    }

    this.sellError.style.display = numShares > 0 ? 'none' : 'flex';
  }

  resetSellForm() {
    this.setState({
      estimatedCredit: '0',
      orderSummaryDisplay: 'none',
      submitButtonDisplay: false,
    });
  }

  handleSubmitButtonClick(e) {
    e.preventDefault();
    const {
      buyStock,
      sellStock,
      selectedCompany,
      currentUserId,
    } = this.props;

    const { numShares, buyActive } = this.state;
    if (buyActive) {
      buyStock(currentUserId, selectedCompany._id, numShares)
        .then(() => {
          this.displayBuyModal();
        });
    } else {
      sellStock(currentUserId, selectedCompany._id, numShares)
        .then(() => {
          this.displaySellModal();
        });
    }
  }

  toggleActive(e) {
    if (!e.target.classList.contains('header-active')) {
      this.setState({
        buyActive: !this.state.buyActive,
        sellActive: !this.state.sellActive
      });
    }
  }

  inputActive(e) {
    console.log('INPUT IS NOW ACTIVE!');
    if (!e.target.classList.contains('input-active')) {
      this.setState({
        inputActive: !this.state.inputActive
      });
    }
  }

  renderBuyButton() {
    return (
      <button type="button" onClick={this.handleBuyButtonClick} style={{ backgroundColor: this.props.fillColor }}>
        Buy
      </button>
    );
  }

  renderSellButton() {
    return (
      <button type="button" onClick={this.handleSellButtonClick} style={{ backgroundColor: this.props.fillColor }}>
        Sell
      </button>
    );
  }

  renderSubmitButton() {
    const { buyStockLoading, sellStockLoading } = this.props;
    /* eslint-disable no-nested-ternary */
    const tradeLoading = buyStockLoading
      ? true
      : sellStockLoading
        ? true
        : false;
    /* eslint-enable */
    return (
      <button type="submit" onClick={this.handleSubmitButtonClick} style={{ backgroundColor: this.props.fillColor }}>
        {
          tradeLoading ? <LoadingTradeSpinner /> : 'Submit'
        }
      </button>
    );
  }

  renderBuyForm() {
    const {
      numShares,
      estimatedCost,
      orderSummaryDisplay,
      submitButtonDisplay,
      inputActive,
    } = this.state;

    const {
      selectedCompany,
      latestPrice,
      loadingLatestPrice,
      buyingPower
    } = this.props;

    const inputStyle = inputActive ? { border: `1px solid ${this.props.fillColor}`} : {border: '1px solid #f6f6f6' };

    return (
      <div className="buy-form">
        <form>
          <div className="shares order-form-elem">
            <span>
              Shares
            </span>
            <input
              className={inputActive ? 'input-active' : ''}
              style={inputStyle}
              type="number"
              name="shares"
              placeholder="0"
              ref={(input) => { this.sharesInput = input }}
              onChange={this.updateNumShares}
              onFocus={this.inputActive}
              value={numShares}
            />
          </div>

          <div className="market-price order-form-elem">
            <span style={{ color: this.props.fillColor }}>
              Market Price
            </span>
            <span>
              { loadingLatestPrice
                ? ''
                : `$${latestPrice.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
            </span>
          </div>

          <div className="estimated-cost order-form-elem">
            <span>
              Estimated Cost
            </span>
            <span>
              $
              { estimatedCost}
            </span>
          </div>

          <div className="order-summary order-form-elem" style={{ display: orderSummaryDisplay }}>
            {`
              You are about to submit an order for ${numShares} share(s) to buy ${selectedCompany.symbol}
              for $${estimatedCost}. This order will execute at the best available price.
            `}
          </div>

          <div className="order-button-container">
            {
              submitButtonDisplay === false ? this.renderBuyButton() : this.renderSubmitButton()
            }
          </div>
        </form>

        <div className="buying-power">
          {`
            $${buyingPower} Buying Power Available
          `}
        </div>
      </div>
    );
  }

  // @TODO: Update classNames?
  renderSellForm() {
    const {
      numShares,
      estimatedCredit,
      sharesOwned,
      orderSummaryDisplay,
      submitButtonDisplay,
      inputActive,
    } = this.state;

    const {
      selectedCompany,
      latestPrice,
      loadingLatestPrice,
    } = this.props;

    const inputStyle = inputActive ? {border: `1px solid ${this.props.fillColor}`} : {border: '1px solid #f6f6f6' };

    return (
      <div className="buy-form">
        <form>
          <div className="shares order-form-elem">
            <span>
              Shares
            </span>
            <input
              className={inputActive ? 'input-active' : ''}
              style={inputStyle}
              type="number"
              name="shares"
              placeholder="0"
              ref={(input) => { this.sharesInput = input }}
              onChange={this.updateNumShares}
              onFocus={this.inputActive}
              value={numShares}
            />
          </div>

          <div className="market-price order-form-elem">
            <span style={{ color: this.props.fillColor }}>
              Market Price
            </span>
            <span>
              { loadingLatestPrice
                ? ''
                : `$${latestPrice.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
            </span>
          </div>

          <div className="estimated-cost order-form-elem">
            <span>
              Estimated Credit
            </span>
            <span>
              $
              { estimatedCredit }
            </span>
          </div>

          <div className="order-summary order-form-elem" style={{ display: orderSummaryDisplay }}>
            {`
              You are about to submit an order for ${numShares} share(s) to sell ${selectedCompany.symbol}
              for $${estimatedCredit}. This order will execute at the best available price.
            `}
          </div>

          <div
            className="sell-error"
            ref={(sellError) => { this.sellError = sellError }}
            style={{ color: 'red', display: 'none' }}>
            You must select the number of shares you would like to sell
          </div>

          <div className="order-button-container">
            { submitButtonDisplay === false ? this.renderSellButton() : this.renderSubmitButton() }
          </div>
        </form>

        <div className="buying-power">
          {`
            ${sharesOwned} Shares Available
          `}
        </div>
      </div>
    );
  }

  renderOrderForm() {
    const { selectedCompany } = this.props;
    const {
      watching,
      numShares,
      estimatedCost,
      orderSummaryDisplay,
      submitButtonDisplay,
      owned,
      buyActive,
      sellActive,
    } = this.state;

    const buyTabStyle = buyActive ? {borderBottom: `2px solid ${this.props.fillColor}`} : {borderBottom: 'none' };
    const sellTabStyle = sellActive ? {borderBottom: `2px solid ${this.props.fillColor}`} : {borderBottom: 'none' };

    return (
      <div className="sidebar">
        <div className="order-form">
          <div className="order-form-header">
            <div
              className={`buy-header ${ buyActive ? 'header-inactive' : '' }`}
              onClick={e => this.toggleActive(e)}
              style={buyTabStyle}
            >
              Buy
              <span className="company-symbol">
                { selectedCompany.symbol }
              </span>
            </div>
            {
              owned ?
                (
                  <div
                    className={`sell-header ${ !sellActive ? 'header-inactive' : ''}`}
                    onClick={e => this.toggleActive(e)}
                    style={sellTabStyle}
                  >
                    Sell
                    <span className="company-symbol">
                      { selectedCompany.symbol }
                    </span>
                  </div>
                ) : null
            }
          </div>

          {
            buyActive ? this.renderBuyForm() : this.renderSellForm()
          }
        </div>

        <div className="watch-button-container">
          <button
            className="watch-button"
            type="button"
            onClick={this.handleWatchButtonClick}
            style={{
              color: this.props.fillColor,
              border: `1px solid ${this.props.fillColor}`
            }}
          >
            {
              watching ? 'Remove from Watchlist' : 'Add to Watchlist'
            }
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { displayBuyModal, displaySellModal, selectedCompany } = this.props;
    const { numShares, estimatedCost, estimatedCredit } = this.state;

    return (
      /* eslint-disable no-nested-ternary */
      <div className="sidebar-wrapper">
        {
          displayBuyModal
            ? <BuyModal
                numShares={numShares}
                company={selectedCompany}
                sharesWorth={estimatedCost}
                resetBuyForm={this.resetBuyForm}
              />
            : displaySellModal
              ? <SellModal
                  numShares={numShares}
                  company={selectedCompany}
                  sharesWorth={estimatedCredit}
                  resetSellForm={this.resetSellForm}
                />
              : this.renderOrderForm()
        }
      </div>
      /* eslint-enable */
    );
  }
}


export default Sidebar;
