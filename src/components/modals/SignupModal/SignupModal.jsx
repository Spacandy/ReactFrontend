//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withStyles as MUIStyles } from '@material-ui/core/styles';
import theme from './SignupModal.css';

import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from 'actions/auth';
import {
  validatePassword,
  validateRequired,
  validateEmailFormat,
} from 'helpers/validation';
import isArrayEmpty from 'helpers/isArrayEmpty';
import signUpMutation from './signUp.graphql';
import serialize from 'serialize-javascript';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { isRelease } from 'settings';

type PropsType = {
  signUpAction: Function,
  onSignUp: Function,
  handleClose: Function,
  modalControl: Function,
  isOpen: boolean,
};

type DefaultPropsType = {};

type StateType = {
  email: string,
  password1: string,
  password2: string,
  firstName: string,
  lastName: string,
  errors: {
    email: [String],
    password1: [String],
    password2: [String],
    firstName: [String],
    lastName: [String],
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

class SignUpModal extends React.Component<DefaultPropsType, PropsType, StateType> {
  static defaultProps: DefaultPropsType;
  props: PropsType;
  state: Statetype = {
    email: null,
    password1: null,
    password2: null,
    firstName: null,
    lastName: null,
    canRegister: true,
    errors: {
      email: [],
      password1: [],
      password2: [],
      firstName: [],
      lastName: [],
    },
  };

  onChange = value => {
    return value;
  };

  handleSignUp = () => {
    this.setState(() => {
      return {
        canRegister: false,
      };
    });
    this.props
      .mutate({
        variables: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password1: this.state.password1,
          password2: this.state.password2,
        },
      })
      .then(graphqlResponse => graphqlResponse.data.signUp)
      .then(data => {
        if (data.form_errors) {
          this.setState({
            canRegister: true,
            errors: {
              ...this.state.errors,
              email: data.form_errors.email || '',
              password1: data.form_errors.password1 || '',
              password2: data.form_errors.password2 || '',
              firstName: data.form_errors.first_name || '',
              lastName: data.form_errors.last_name || '',
            },
          });
        } else {
          this.props.handleClose();
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
                    csrftoken
                  }
                }
              `,
              variables: {
                username: this.state.email,
                password: this.state.password1,
              },
            })
            .then(response => {
              let { id, csrftoken } = response.data.auth;
              this.props.authenticateAction(id, csrftoken);
              this.props.identifyAction(response.data.auth);

              this.props.handleClose();
            })
            .catch(error => {
              console.log(error);
              this.setState({
                ...this.state,
                errors: {
                  ...this.state.errors,
                  all: 'Incorrect username or password',
                },
              });
            });
          this.setState(() => {
            return {
              canRegister: true,
            };
          });
          this.handleLogin(this.state.email, this.state.password1);
          isRelease && window
            ? window.ga('send', 'event', 'Auth', 'Signup', this.state.email)
            : null;
          this.setState({
            email: '',
            password1: '',
            password2: '',
            firstName: '',
            lastName: '',
            errors: {
              ...this.state.errors,
              email: '',
              password1: '',
              password2: '',
              firstName: '',
              lastName: '',
            },
          });
        }
      })
      .catch(error => {
        console.error('Error submitting request\n' + serialize(error, { isJSON: true }));
      });
  };
  handleLogin = (username, password) => {
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
              token
            }
          }
        `,
        variables: {
          username: username,
          password: password,
        },
      })
      .then(response => {
        let { id, token } = response.data.auth;
        this.props.authenticateAction(id, token);
        this.props.identifyAction(response.data.auth);

        this.props.handleClose();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            all: 'Incorrect username or password',
          },
        });
      });
  };

  // ----FIELD FUNCTIONS

  handleRequestClose = () => {
    this.setState({ isOpen: false });
  };

  handleChangeEmail = event => this.setState({ email: event.target.value });
  handleBlurEmail = () => this.validate('email');

  handleChangePassword1 = event => this.setState({ password1: event.target.value });
  handleBlurPassword1 = () => this.validate('password1');

  handleChangePassword2 = event => this.setState({ password2: event.target.value });
  handleBlurPassword2 = () => this.validate('password2');

  handleChangeFirstName = event => this.setState({ firstName: event.target.value });
  handleChangeLastName = event => this.setState({ lastName: event.target.value });
  handleBlurFirstName = () => this.validate('firstName');
  handleBlurLastName = () => this.validate('lastName');

  validate = name => {
    const value = this.state[name];
    let errorList = [];
    let validators = [];

    if (name === 'email') {
      validators = [validateRequired, validateEmailFormat];
    } else if (name === 'password1' || name === 'password2') {
      validators = [validateRequired, validatePassword];
    } else {
      // maybe add more
      validators = [validateRequired];
    }

    validators.map(validator => {
      errorList = errorList.concat(validator(value));
      return errorList;
    });

    this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        [name]: errorList,
      },
    });
  };

  renderDialogActions = () => {
    return (
      <DialogActions>
        <Button color="inherit" onClick={this.props.handleClose}>
          Cancel
        </Button>
        <Button color="inherit" onClick={this.switchToSignIn}>
          Login
        </Button>
        <Button
          color="primary"
          disabled={!this.state.canRegister}
          onClick={() => this.handleSignUp()}
        >
          Sign Up
          {!this.state.canRegister && (
            <CircularProgress size={24} className={this.props.classes.buttonProgress} />
          )}
        </Button>
      </DialogActions>
    );
  };

  switchToSignIn = () => {
    this.props.modalControl('signup', 'close');
    this.props.modalControl('auth', 'open');
  };

  render() {
    let { isOpen, fullScreen } = this.props;
    let { email, password1, password2, firstName, lastName } = this.state;
    return (
      <div>
        <Dialog open={isOpen} fullScreen={fullScreen} onClose={this.handleRequestClose}>
          <h1
            style={{
              fontFamily: 'Roboto',
              paddingLeft: 20,
              fontSize: 30,
            }}
          >
            Sign Up
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
              error={
                isArrayEmpty(this.state.errors.email) ? null : this.state.errors.email
              }
              helperText={
                isArrayEmpty(this.state.errors.email) ? null : this.state.errors.email
              }
              value={email}
              fullWidth
            />
            <TextField
              margin="normal"
              required
              id="firstName"
              label="First"
              type="text"
              onChange={this.handleChangeFirstName}
              error={isArrayEmpty(this.state.errors.name) ? null : this.state.errors.name}
              helperText={
                isArrayEmpty(this.state.errors.name) ? null : this.state.errors.name
              }
              value={firstName}
              fullWidth
            />
            <TextField
              margin="normal"
              required
              id="lastName"
              label="Last"
              type="text"
              onChange={this.handleChangeLastName}
              error={isArrayEmpty(this.state.errors.name) ? null : this.state.errors.name}
              helperText={
                isArrayEmpty(this.state.errors.name) ? null : this.state.errors.name
              }
              value={lastName}
              fullWidth
            />
            <TextField
              required
              margin="normal"
              id="password1"
              label="Password"
              type="password"
              onChange={this.handleChangePassword1}
              error={
                isArrayEmpty(this.state.errors.password1)
                  ? null
                  : this.state.errors.password1
              }
              helperText={
                isArrayEmpty(this.state.errors.password1)
                  ? null
                  : this.state.errors.password1
              }
              value={password1}
              fullWidth
            />
            <TextField
              required
              margin="normal"
              id="password2"
              label="Password (again)"
              type="password"
              onChange={this.handleChangePassword2}
              error={
                isArrayEmpty(this.state.errors.password2)
                  ? null
                  : this.state.errors.password2
              }
              helperText={
                isArrayEmpty(this.state.errors.password2)
                  ? null
                  : this.state.errors.password2
              }
              value={password2}
              fullWidth
            />

            <Typography variant="subheading">
              By continuing you agree to{' '}
              <a
                style={{ color: '#00aeef' }}
                rel="noopener noreferrer"
                target="_blank"
                href="/legal/terms-of-services"
                onClick={() =>
                  isRelease && window
                    ? window.ga('send', 'event', 'Auth', 'Signup TOS Clicked')
                    : null
                }
              >
                EventHi's Terms of Service
              </a>
            </Typography>
          </DialogContent>
          {this.renderDialogActions()}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

const mapDispatchToProps = dispatch => ({
  signUpAction: () => {
    dispatch(actions.signup());
  },
  identifyAction: info => {
    dispatch(actions.identify(info));
  }, // fill out user data in the store
  authenticateAction: (id, token) => {
    dispatch(actions.authenticate(id, token));
  }, // fill out authentication data in the store (id, token, authenticated = True)
});

export default compose(
  withStyles(theme),
  MUIStyles(styles),
  graphql(signUpMutation),
  withMobileDialog(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withApollo,
)(SignUpModal);
