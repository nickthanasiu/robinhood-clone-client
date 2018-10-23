import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

import { signin } from '../../actions';
import Feather from '../Feather';

import './style.scss';

const API_URL = 'https://doohnibor-server.herokuapp.com/api';
// @TODO: Update FontAwesome Icon.

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      demoOpen: false,
    };

    this.demoSignin = this.demoSignin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.demoDropDown = this.demoDropDown.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillMount() {
    // Ping the Heroku backend, to wake it up. Improve loading performance
    axios.get(`${API_URL}/heroku_ping`)
      .then((value) => {
        console.log(value.data);
      });
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

  demoSignin() {
    this.onSubmit({
      email: 'demo',
      password: 'abc123'
    });
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

  demoDropDown() {
    const message = 'Loading demo profile...';
    return (
      <div className="demo-drop-down" style={{ color: '#30cd9a' }}>
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
              {
                this.state.demoOpen ? this.demoDropDown() : null
              }
              <div className="signin-form">
                <div className="signin-header">
                  <h3>
                    Welcome to Doohnibor
                  </h3>

                  <Feather />
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
                    <button type="submit">
                      Sign In
                    </button>
                    <div className="links">
                      <div
                        className="demo-signin"
                        onClick={this.demoSignin}
                      >
                        <Link to="/dashboard">
                          <button type="submit">
                            Click here to demo the app
                          </button>
                        </Link>
                      </div>
                      <Link to="/signup">
                        Not a user? Sign up here
                      </Link>
                    </div>
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
