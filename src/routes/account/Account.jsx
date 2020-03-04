//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import history from 'localHistory';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Svg from 'components/Svg';
import SidebarController from 'components/SidebarController';

import { profileTab, changePasswordTab } from 'settings';

type Props = {
  authenticated: boolean | null,
  children: mixed,
  classes: {
    text: {},
  },
};

type State = {};

const styles = theme => ({
  root: {
    marginTop: 40,
  },
  helperRoot: {
    color: 'white',
  },
  select: {
    color: 'white',
  },
  inputLabelRoot: {
    color: 'white',
    left: 20,
  },
  inkbar: {
    '&:after': {
      backgroundColor: 'white',
    },
  },
  selectIcon: {
    color: 'white',
  },
  formControl: {
    width: 200,
    padding: '0 20px 10px',
  },
  menuRoot: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  listItemRoot: {
    backgroundColor: 'blue',
  },
  menuFocusRoot: {
    '&:focus': {
      outline: 0,
    },
  },
});

class Account extends Component<Props, State> {
  state: State;
  props: Props;

  // UNSAFE_componentWillMount() {
  //   if (!this.props.authenticated) {
  //     if (history) {
  //       history.push('/');
  //     } else {
  //       console.warn('no history module');
  //     }
  //   }
  // }

  render() {
    return this.props.authenticated ? (
      <SidebarController
        list={
          <List>
            {profileTab ? (
              <ListItem button onClick={() => history.push('/account/profile')}>
                <ListItemIcon>
                  <Svg icon="ProfileEdit" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            ) : null}
            {changePasswordTab ? (
              <ListItem button onClick={() => history.push('/account/change-password')}>
                <ListItemIcon>
                  <Svg icon="EventEdit" />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItem>
            ) : null}
            <ListItem button onClick={() => history.push('/account/billing')}>
              <ListItemIcon>
                <Svg icon="CreditCard" />
              </ListItemIcon>
              <ListItemText primary="Billing" />
            </ListItem>
          </List>
        }
      >
        {this.props.children}
      </SidebarController>
    ) : (
      <div />
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default compose(withStyles(styles), connect(mapStateToProps, null))(Account);
