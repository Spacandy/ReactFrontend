//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withStyles as MUIStyles } from '@material-ui/core/styles';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { isRelease } from 'settings';

import passwordResetKeyMutation from './passwordResetKey.graphql';
import theme from './Password.css';

type Props = {};

type State = {};

const styles = () => ({});

class Password extends Component<Props, State> {
  state: State = {
    password1: '',
    password2: '',
    errors: {
      password1: '',
      password2: '',
    },
  };
  props: Props;

  handleEnter = event => {
    if (event.which === 13) {
      this.handleSubmit();
    }
  };

  handleChangePassword1 = event => this.setState({ password1: event.target.value });

  handleChangePassword2 = event => this.setState({ password2: event.target.value });

  handleSubmit = () => {
    this.props
      .mutate({
        variables: {
          resetKey: this.props.resetKey,
          password1: this.state.password1,
          password2: this.state.password2,
        },
      })
      .then(graphqlResponse => graphqlResponse.data.passwordResetKey)
      .then(data => {
        if (data.form_errors) {
          this.setState({
            errors: {
              ...this.state.errors,
              password1: data.form_errors.password1 || '',
              password2: data.form_errors.password2 || '',
            },
          });
        } else {
          this.setState({
            password1: '',
            password2: '',
            errors: {
              ...this.state.errors,
              password1: '',
              password2: '',
            },
          });
          if (window) {
            window.location = '/';
            if (isRelease) window.ga('send', 'event', 'Auth', 'Password Reset Completed');
          }
        }
      })
      .catch(error => {
        console.error(`Error submittin request\n ${JSON.stringify(error)}`);
      });
  };
  render() {
    return (
      <div className={theme.wrapper}>
        <div className={theme['inner-div']}>
          <img
            className={theme.logo}
            src="https://d3rd29nk50moi4.cloudfront.net/logo.png"
          />
          <Typography variant="headline" style={{ textAlign: 'center', marginTop: 20 }}>
            Password Reset
          </Typography>

          <TextField
            margin="normal"
            required
            id="password1"
            label="Password 1"
            type="password"
            onKeyDown={this.handleEnter}
            onChange={this.handleChangePassword1}
            value={this.state.password1}
            error={this.state.errors.password1}
            fullWidth
          />
          <TextField
            margin="normal"
            required
            id="password2"
            label="Password 2"
            type="password"
            onKeyDown={this.handleEnter}
            onChange={this.handleChangePassword2}
            value={this.state.password2}
            error={this.state.errors.password2}
            fullWidth
          />
          <Button
            color="primary"
            onClick={this.handleSubmit}
            style={{ left: 106, top: 50 }}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(theme),
  MUIStyles(styles),
  graphql(passwordResetKeyMutation),
)(Password);
