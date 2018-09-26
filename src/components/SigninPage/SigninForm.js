import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { FaIdBadge } from 'react-icons/fa';
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
    const message = errorMessage.length === 0 ? 'Welcome Back!' : errorMessage;
    const color = errorMessage.length === 0 ? '#30cd9a' : '#f68f7c';
    return (
      <div className="drop-down" style={{ backgroundColor: color }}>
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
        {
          this.state.open ? this.dropDown() : null
        }
        <div className="signin-header">
          <h5>
            Sign In
          </h5>
        </div>
        <div className="signin-icon">
          <FaIdBadge />
        </div>
        <div className="signin-form">
          <form
            id="signin-form"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <div className="form-input">
              <Field
                name="email"
                type="text"
                component="input"
                autoComplete="none"
                placeholder="E-mail"
              />
            </div>
            <div className="form-input">
              <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
                placeholder="Password"
              />
            </div>

            <button type="submit">
              Sign In
            </button>
          </form>
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
