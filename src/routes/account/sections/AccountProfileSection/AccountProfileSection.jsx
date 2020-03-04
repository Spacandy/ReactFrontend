//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import serialize from 'serialize-javascript';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { identify } from 'actions/auth';

import identifyQuery from 'components/Layout/identify.graphql';
import profileChangeMutation from './profileChange.graphql';

type Props = {
  firstName: string,
  lastName: string,
  identifyAction: Function,
  mutate: Function,
  client: {
    query: Function,
  },
};

type State = {
  done: boolean,
  firstName: string,
  lastName: string,
  errors: Object,
};

class AccountProfileSection extends Component<Props, State> {
  state: State = {
    done: false,
    firstName: '',
    lastName: '',
    errors: {
      firstName: '',
      lastName: '',
    },
  };

  componentDidMount = () => {
    this.setState({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
    });
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

  handleSubmit = () => {
    this.props
      .mutate({
        variables: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        },
      })
      .then(graphqlResponse => graphqlResponse.data.profileChange)
      .then(data => {
        if (data.form_errors) {
          this.setState({
            errors: {
              ...this.state.errors,
              firstName: data.form_errors.firstName || '',
              lastName: data.form_errors.lastName || '',
            },
          });
        } else {
          this.props.client
            .query({
              query: identifyQuery,
              fetchPolicy: 'network-only',
            })
            .then(response => {
              this.props.identifyAction(response.data.identify);
              this.setState({
                done: true,
                errors: {
                  ...this.state.errors,
                  firstName: '',
                  lastName: '',
                },
              });
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      })
      .catch(error => {
        console.error(
          `Error submitting request\n'  ${serialize(error, { isJSON: true })}`,
        );
      });
  };

  render() {
    return (
      <div>
        {this.state.done ? <h2>Profile updated successfully!</h2> : null}
        <TextField
          id="first_name"
          label="First Name"
          onKeyDown={this.handleEnter}
          onChange={this.handleChange('firstName')}
          value={this.state.firstName}
          errorText={this.state.errors.firstName}
          margin="normal"
        />
        <br />
        <TextField
          id="Last_name"
          label="Last Name"
          onKeyDown={this.handleEnter}
          onChange={this.handleChange('lastName')}
          value={this.state.lastName}
          errorText={this.state.errors.lastName}
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

const mapStateToProps = state => ({
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
});

const mapDispatchToProps = dispatch => ({
  identifyAction: info => {
    dispatch(identify(info));
  },
});

export default compose(
  graphql(profileChangeMutation),
  withApollo,
  connect(mapStateToProps, mapDispatchToProps),
)(AccountProfileSection);
