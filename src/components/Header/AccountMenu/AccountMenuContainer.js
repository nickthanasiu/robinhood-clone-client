import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getPortfolioValue } from '../../../actions/portfolio';
import { getUsername } from '../../../actions/user';
import { getBuyingPower } from '../../../actions/stocks';

// Components
import AccountMenu from './AccountMenu';

class AccountMenuContainer extends Component {
    componentDidMount() {
        const { currentUserId, getPortfolioValue, getUsername } = this.props;
        getPortfolioValue(currentUserId);
        getUsername(currentUserId);
    }

    componentWillReceiveProps(newProps) {
        const { getBuyingPower, portfolioValueAsNum } = newProps;
        if (newProps.portfolioValueAsNum !== this.props.portfolioValueAsNum) {
            getBuyingPower(portfolioValueAsNum);
        }
    }

    render() {
        const {
            loadingUsername,
            username,
            portfolioValue,
            loadingBuyingPower,
            buyingPower
        } = this.props;

        return (
            <AccountMenu 
                loadingUsername={loadingUsername}
                username={username}
                portfolioValue={portfolioValue}
                loadingBuyingPower={loadingBuyingPower}
                buyingPower={buyingPower}
            />
        );
    }
}

const mapStateToProps = state => ({
    currentUserId: state.auth.currentUserId,
    loadingUsername: state.user.loadingUsername,
    username: state.user.username,
    portfolioValue: state.portfolio.portfolioValue,
    portfolioValueAsNum: state.portfolio.portfolioValueAsNum,
    loadingBuyingPower: state.stocks.loadingBuyingPower,
    buyingPower: state.stocks.buyingPower,
});

const mapDispatchToProps = dispatch => ({
    getPortfolioValue: currentUserId => dispatch(getPortfolioValue(currentUserId)),
    getBuyingPower: currentUserId => dispatch(getBuyingPower(currentUserId)),
    getUsername: currentUserId => dispatch(getUsername(currentUserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenuContainer);