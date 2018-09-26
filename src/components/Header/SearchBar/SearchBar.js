import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getCompanies, searchCompanies } from '../../../actions/companies';

import './style.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      queryResults: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.queryResults = this.queryResults.bind(this);
  }

  componentDidMount() {
    this.props.getCompanies();
  }

  handleSubmit(e) {
    e.preventDefault();
    // Call searchCompanies action with this.state.query
    this.props.searchCompanies(this.state.query, () => {
      this.props.history.push('/company');
    });
    // Then reset state
    this.setState({
      query: '',
      queryResults: [],
    });
  }

  handleClick(e) {
    e.preventDefault();
    const query = e.currentTarget.getAttribute('value');
    this.props.searchCompanies(query, () => {
      this.props.history.push('/company');
    });
  }

  handleInputChange(e) {
    this.setState({
      query: e.target.value
    }, () => {
      this.queryResults();
    });
  }

  queryResults() {
    this.setState({
      queryResults: this.companies.filter((company) => {
        return company.name.includes(this.state.query);
      })
    });
  }

  render() {
    return (
      <div className="search-container">
        <div className="search-wrapper">
          <form onSubmit={this.handleSubmit}>
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            />
          </form>
        </div>

        <ul className="query-results">
          {
            this.state.query === '' ? null :
              this.state.queryResults.map(result => (
                <li
                  className="query-results-item"
                  key={result._id}
                  value={result.name}
                  onClick={this.handleClick}
                >
                  <div className="result-wrapper">
                    <div className="result-symbol">
                      { result.symbol }
                    </div>
                    <div className="result-name">
                      { result.name }
                    </div>
                  </div>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies.allCompanies,
});

const mapDispatchToProps = dispatch => ({
  getCompanies: () => dispatch(getCompanies()),
  searchCompanies: (query, callback) => dispatch(searchCompanies(query, callback)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(SearchBar);
