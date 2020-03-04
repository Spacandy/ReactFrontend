//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose } from 'react-apollo';
import serialize from 'serialize-javascript';
import { withStyles as MUIStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import theme from './PasswordResetModal.css';

import passwordResetMutation from './passwordReset.graphql';

import { validateEmailFormat, validateRequired } from 'helpers/validation';
import { isRelease } from 'settings';

type PropsType = {
  isOpen: boolean,
  modalControl: Function,
  client: {
    query: Function,
  },
};

type DefaultPropsType = {};

type StateType = {
  email: string,
  errors: {
    all: string,
    email: string,
  },
};

const styles = () => ({
  paper: {
    width: 300,
  },
});

class PasswordResetModal extends Component<DefaultPropsType, PropsType, StateType> {
  static defaultProps: DefaultPropsType;
  props: PropsType;
  state: StateType = {
    email: '',
    errors: { all: '', email: '' },
    confirmationOpen: false,
  };

  handleClose = () => {
    this.props.modalControl('passwordReset', 'close');
    this.props.modalControl('auth', 'close');
    this.setState({ confirmationOpen: false });
  };

  dialogActions = () => {
    return [
      <Button color="inherit" key="0" onClick={this.handleClose}>
        Cancel
      </Button>,
      <Button color="primary" key="1" onClick={this.handlePasswordReset}>
        Send Email
      </Button>,
    ];
  };

  validateEmailField = () => {
    let emailErrors = validateEmailFormat(this.state.email);
    this.setState({
      ...this.state,
      errors: { ...this.state.errors, email: emailErrors[0] || '' },
    });
    return emailErrors.length == 0;
  };

  handlePasswordReset = () => {
    this.props
      .mutate({
        variables: {
          email: this.state.email,
        },
      })
      .then(graphqlResponse => graphqlResponse.data.passwordReset)
      .then(data => {
        if (data.form_errors) {
          this.setState({
            errors: {
              ...this.state.errors,
              email: data.form_errors.email || '',
            },
          });
        } else {
          isRelease && window
            ? window.ga(
                'send',
                'event',
                'Auth',
                'Password Reset Requested',
                this.state.email,
              )
            : null;
          this.setState({
            email: '',
            errors: {
              ...this.state.errors,
              email: '',
            },
          });
          this.handleClose();
          this.setState({ confirmationOpen: true });
        }
      })
      .catch(error => {
        console.error('Error submittin request\n' + serialize(error, { isJSON: true }));
      });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return [
      <Dialog
        fullScreen={this.props.fullScreen}
        open={this.props.isOpen}
        classes={{ paperWidthSm: this.props.classes.paper }}
        onClose={this.handleRequestCloseConfirmation}
        key="0"
      >
        <h1
          style={{
            fontFamily: 'Roboto',
            paddingLeft: 20,
            fontSize: 30,
          }}
        >
          Password Reset
        </h1>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="normal"
            id="name"
            label="Email Address"
            type="email"
            onChange={this.handleChangeEmail}
            value={this.state.email}
            fullWidth
          />
          <br />
          <label>{this.state.errors.all}</label>
        </DialogContent>
        <DialogActions>{this.dialogActions()}</DialogActions>
      </Dialog>,
      <Dialog
        open={this.state.confirmationOpen}
        onClose={() => this.props.modalControl('auth', 'open')}
        key="1"
      >
        <h1
          style={{
            fontFamily: 'Roboto',
            paddingLeft: 20,
            fontSize: 30,
          }}
        >
          Password Reset
        </h1>
        <DialogContent>The password reset email has be sent.</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => this.handleClose()}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>,
    ];
  }
}

export default compose(
  withStyles(theme),
  MUIStyles(styles),
  withMobileDialog(),
  graphql(passwordResetMutation),
)(PasswordResetModal);
