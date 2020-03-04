//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import baseURL from 'data/endpoints';
import { identify, authenticate } from 'actions/auth';

import { isRelease } from 'settings';

import theme from './EmailValidationSection.css';
import 'whatwg-fetch';

type Props = {
  validationKey: string,
};

type State = {};

const validationURL = `${baseURL}/users/validate-email/`;

class EmailValidationSection extends Component<Props, State> {
  state: State = {
    done: false,
    error: false,
  };
  componentDidMount = () => {
    fetch(validationURL + this.props.validationKey, {
      method: 'POST',
    })
      .then(response => {
        this.setState({
          done: response.ok,
          error: !response.ok,
        });
        return response.json().then(data => {
          data.id = data.id.toString();
          this.props.authenticateAction(data.id, data.token);
          this.props.identifyAction(data);
          return isRelease
            ? window.ga('send', 'event', 'Auth', 'Email Validation', data.email)
            : null;
        });
      })
      .catch(error => console.error(error));
  };

  props: Props;

  handleGoHomeClick = () => {
    window.location = '/';
  };

  render() {
    return (
      <div className={theme['wrapper']}>
        <div className={theme['inner-div']}>
          <img
            className={theme.logo}
            src={'https://d3rd29nk50moi4.cloudfront.net/logo.png'}
          />
          <br />
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant="title">
            {this.state.error
              ? 'Email validation failed, please try again.'
              : this.state.done
                ? 'Your email has been validated.'
                : 'Validating email ...'}
          </Typography>
          <Button
            color="primary"
            onClick={this.handleGoHomeClick}
            focusRipple
            style={{ left: 106, top: 50 }}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  identifyAction: info => {
    dispatch(identify(info));
  }, // fill out user data in the store
  authenticateAction: (id, token) => {
    dispatch(authenticate(id, token));
  }, // fill out authentication data in the store (id, token, authenticated = True)
});

export default compose(
  withStyles(theme),
  connect(
    null,
    mapDispatchToProps,
  ),
)(EmailValidationSection);
