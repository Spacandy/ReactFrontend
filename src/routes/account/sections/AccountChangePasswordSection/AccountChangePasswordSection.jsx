//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import serialize from 'serialize-javascript';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import passwordChangeMutation from './passwordChange.graphql';

type Props = {
  mutate: Function,
};

type State = {
  done: boolean,
  oldpassword: string,
  password1: string,
  password2: string,
  errors: Object,
};

const styles = {};

class AccountChangePasswordSection extends Component<Props, State> {
  state: State = {
    done: false,
    oldpassword: '',
    password1: '',
    password2: '',
    errors: {
      oldpassword: '',
      password1: '',
      password2: '',
    },
  };

  props: Props;

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleEnter = event => {
    if (event.which === 13) {
      this.handleSubmit();
    }
  };

  deleteCookie = name => {
    document.cookie = `${name} =;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  };

  handleSubmit = () => {
    this.props
      .mutate({
        variables: {
          oldpassword: this.state.oldpassword,
          password1: this.state.password1,
          password2: this.state.password2,
        },
      })
      .then(graphqlResponse => graphqlResponse.data.passwordChange)
      .then(data => {
        if (data.form_errors) {
          this.setState({
            errors: {
              ...this.state.errors,
              oldpassword: data.form_errors.oldpassword || '',
              password1: data.form_errors.password1 || '',
              password2: data.form_errors.password2 || '',
            },
          });
        } else {
          this.setState(
            {
              done: true,
              oldpassword: '',
              password1: '',
              password2: '',
              errors: {
                ...this.state.errors,
                oldpassword: '',
                password1: '',
                password2: '',
              },
            },
            () => {
              console.warn('logging out, redirecting to home');
              this.deleteCookie('user');
              this.deleteCookie('token');
              window.location = '/';
            },
          );
        }
      })
      .catch(error => {
        console.error(`Error submitting request\n ${serialize(error, { isJSON: true })}`);
      });
  };

  render() {
    if (this.state.done) {
      return <h2>Password change successfully!</h2>;
    }

    return (
      <div>
        <TextField
          id="password_old"
          type="password"
          label="Current Password"
          required
          onKeyDown={this.handleEnter}
          onChange={this.handleChange('oldpassword')}
          value={this.state.oldpassword}
          errorText={this.state.errors.oldpassword}
          margin="normal"
        />
        <br />
        <TextField
          id="password_new_1"
          type="password"
          label="New Password"
          required
          onKeyDown={this.handleEnter}
          onChange={this.handleChange('password1')}
          value={this.state.password1}
          errorText={this.state.errors.password1}
          margin="normal"
        />
        <br />
        <TextField
          id="password_new_2"
          type="password"
          label="Repeat Password"
          required
          onKeyDown={this.handleEnter}
          onChange={this.handleChange('password2')}
          value={this.state.password2}
          errorText={this.state.errors.password2}
          margin="normal"
        />
        <br />
        <Button color="primary" variant="raised" onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}

export default compose(withStyles(styles), graphql(passwordChangeMutation))(
  AccountChangePasswordSection,
);
