import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { signin } from '../../actions';

import './style.scss';

// @TODO: Update FontAwesome Icon.

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  onSubmit(formProps) {
    this.setState({
      open: true
    });
    this.props.signin(formProps, () => {
      this.redirect();
    });
    this.props.reset();
  }

  dropDown() {
    const { errorMessage } = this.props;
    const message = errorMessage.length === 0 ? 'Loading your profile...' : errorMessage;
    const color = errorMessage.length === 0 ? '#30cd9a' : '#f68f7c';
    return (
      <div className="drop-down" style={{ color }}>
        { message }
      </div>
    );
  }

  redirect() {
    setTimeout(() => {
      this.props.history.push('/dashboard');
    }, 1000);
  }

  render() {
    return (
      <div className="signin-page">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-6 image-container" />

            <div className="col-md-6 page-content">
              {
                this.state.open ? this.dropDown() : null
              }
              <div className="signin-form">
                <div className="signin-header">
                  <h3>
                    Welcome to Doohnibor
                  </h3>
                </div>

                <form
                  id="signin-form"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <div className="form-input">
                    <label htmlFor="email">
                      E-mail
                    </label>
                    <Field
                      name="email"
                      type="text"
                      component="input"
                      autoComplete="none"
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="firstName">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      component="input"
                      autoComplete="none"
                    />
                  </div>

                  <div className="buttons-wrapper">
                    <Link to="/signup">
                      Not a user? Sign up here
                    </Link>

                    <button type="submit">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  signin: (formProps, callback) => dispatch(signin(formProps, callback)),
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'signin' }),
  withRouter
)(SigninForm);
