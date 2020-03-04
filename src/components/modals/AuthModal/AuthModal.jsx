//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import theme from './AuthModal.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withStyles as MUIStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from 'actions/auth';
import { validateEmailFormat, validateRequired } from 'helpers/validation';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isRelease } from 'settings';

type PropsType = {
  authenticateAction: Function,
  handleClose: Function,
  identifyAction: Function,
  isOpen: boolean,
  modalControl: Function,
  client: {
    query: Function,
  },
};

type DefaultPropsType = {};

type StateType = {
  email: string,
  password: string,
  errors: {
    all: string,
    email: string,
    password: string,
  },
};

const styles = () => ({
  buttonProgress: {
    color: '#00aeef',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class AuthModal extends Component<DefaultPropsType, PropsType, StateType> {
  static defaultProps: DefaultPropsType;
  state: StateType = {
    email: '',
    password: '',
    errors: { all: '', email: '', password: '' },
    failCount: 0,
    canLogin: true,
  };
  props: PropsType;

  renderDialogActions = () => {
    return [
      <DialogActions key="0">
        <Button color="inherit" onClick={this.props.handleClose}>
          Cancel
        </Button>
        <Button color="inherit" onClick={this.switchToSignUp}>
          Signup
        </Button>
        <Button
          color="primary"
          disabled={!this.state.canLogin}
          onClick={this.handleLogin}
        >
          Login
          {!this.state.canLogin && (
            <CircularProgress size={24} className={this.props.classes.buttonProgress} />
          )}
        </Button>
      </DialogActions>,
    ];
  };

  switchToSignUp = () => {
    this.props.modalControl('auth', 'close');
    this.props.modalControl('signup', 'open');
  };

  switchToPasswordReset = () => {
    this.props.modalControl('auth', 'close');
    this.props.modalControl('passwordReset', 'open');
  };

  validateEmailField = () => {
    let emailErrors = validateEmailFormat(this.state.email);
    this.setState({
      ...this.state,
      errors: { ...this.state.errors, email: emailErrors[0] || '' },
    });
    return emailErrors.length == 0;
  };

  createRedirectWrapper = () => {
    this.props.handleCreateRedirect();
    this.props.handleClose();
  };
  handleLogin = () => {
    this.setState(() => {
      return {
        canLogin: false,
      };
    });
    this.props.client
      .query({
        query: gql`
          query Auth($username: String!, $password: String!) {
            auth(username: $username, password: $password) {
              id
              email
              firstName
              lastName
              displayName
              avatarUrl
              hasUsablePassword
              contentTypeId
            }
          }
        `,
        variables: {
          username: this.state.email,
          password: this.state.password,
        },
        fetchPolicy: 'network-only',
      })
      .then(response => {
        let { id, token } = response.data.auth;
        // this.props.authenticateAction(id, token);
        isRelease && window
          ? window.ga('send', 'event', 'Auth', 'Login', response.data.auth.email)
          : null;
        this.props.identifyAction(response.data.auth);
        this.props.referrer === 'create'
          ? this.createRedirectWrapper()
          : this.props.handleClose();
        this.setState(() => {
          return {
            canLogin: true,
          };
        });
      })
      .catch(error => {
        const errorMsg = error.message.split(':', 2)[1];
        this.setState(prevState => {
          return {
            password: '',
            canLogin: true,
            errors: {
              ...prevState.errors,
              all: errorMsg,
            },
          };
        });
      });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleEnter = event => {
    if (event.which === 13) {
      this.handleLogin();
    }
  };

  render() {
    const { isOpen, fullScreen } = this.props;
    return (
      <div>
        <Dialog open={isOpen} fullScreen={fullScreen}>
          <h1
            style={{
              fontFamily: 'Roboto',
              paddingLeft: 20,
              fontSize: 30,
            }}
          >
            Login
          </h1>
          <DialogContent>
            <form>
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
              <TextField
                required
                margin="normal"
                id="password1"
                label="Password"
                type="password"
                onChange={this.handleChangePassword}
                value={this.state.password}
                fullWidth
                helperText={
                  <h4 style={{ fontFamily: 'Roboto', color: 'rgb(213, 0, 0)' }}>
                    {this.state.errors.all}
                  </h4>
                }
              />
            </form>
            <Button color="inherit" onClick={this.switchToPasswordReset}>
              Forgot Password
            </Button>
          </DialogContent>
          {this.renderDialogActions()}
        </Dialog>
        {/* <Dialog
          title="Congratulations!"
          open={this.state.confirmationOpen}
          onClose={this.handleRequestCloseConfirmation}
        >
          <h1
            style={{
              fontFamily: 'Roboto',
              paddingLeft: 20,
              fontSize: 30,
            }}
          >
            Congratulations!
          </h1>
          <DialogContent>Welcome to EventHi. Please login to discover!</DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleConfirmationClose}>
              Great!
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  identifyAction: info => {
    dispatch(actions.identify(info));
  }, // fill out user data in the store
  authenticateAction: (id, token) => {
    dispatch(actions.authenticate(id, token));
  }, // fill out authentication data in the store (id, token, authenticated = True)
});
// prettier-ignore
export default compose(
  withStyles(theme),
  MUIStyles(styles),
  withMobileDialog(),
  withApollo,
  connect(mapStateToProps, mapDispatchToProps),
)(AuthModal);
