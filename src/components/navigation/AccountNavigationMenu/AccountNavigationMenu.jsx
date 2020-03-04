//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import history from 'localHistory';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Svg from 'components/Svg';

import {
  browsePage,
  organizations,
  signOutButton,
  profilePage,
  tickets,
  homeNavButton,
} from 'settings';

import logoutMutation from './logout.graphql';

type PropsType = {
  userEmail: string,
  classes: {},
};

type StateType = {
  anchorEl: any,
};
type DefaultPropsType = {};

const SIZE = 40;

const styles = {
  iconButtonRoot: {
    top: -5,
  },
  avatar: {
    position: 'absolute',
    top: 11,
    left: 9,
  },
  email: {
    fontFamily: 'Roboto',
    fontWeight: 300,
    position: 'absolute',
    top: 0,
    left: 55,
    width: 166,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  menuItemRoot: {
    display: 'block',
    paddingRight: 0,
    outline: 0,
    boxShadow: 0,
  },
  avatarShift: {
    paddingLeft: 60,
  },
  avatarCircle: {
    width: SIZE,
    height: SIZE,

    textAlign: 'center',
    borderRadius: '50%',
    '-webkit-border-radius': '50%',
    '-moz-border-radius': '50%',
    margin: '5px 0px -45px 10px',
  },
  avatarUser: {
    backgroundColor: '#00aeef',
  },
  avatarOrganization: {
    backgroundColor: '#00aeef',
  },
  initials: {
    position: 'relative',
    top: -180 /* 25% of parent */,
    fontSize: SIZE / 2 /* 50% of parent */,
    lineHeight: SIZE / 2 /* 50% of parent */,
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  focusHotfix: {
    outline: 'none',
  },
};

class AccountNavigationMenu extends React.Component<PropsType, StateType> {
  static defaultProps: DefaultPropsType;
  state: StateType = {
    anchorEl: null,
  };
  props: PropsType;

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };

  handleNavigation = (destination, noRoute, isLogout) => {
    if (isLogout) {
      this.props.mutate({}).then(() => {
        window.location = '/';
      });
    }
    if (noRoute !== true) {
      history.push(destination);
      this.setState({ anchorEl: null });
    }
    return console.warn('something went wrong');
  };

  optionsGenerator = userEmail => {
    const settings = {
      browsePage,
      organizations,
      signOutButton,
      profilePage,
      tickets,
      homeNavButton,
    };
    return [
      {
        key: 'user',
        route: '/',
        title: `${userEmail || ''}`,
        avatarType: 'user',
        noRoute: true,
      },
      {
        key: 'organization',
        route: '/',
        title: `Direct Cannabis Network`,
        avatarType: 'organization',
        qualifier: settings.organizations,
      },
      {
        key: 'home',
        route: '/',
        title: 'Home',
        qualifier: settings.homeNavButton,
      },
      {
        key: 'events',
        route: '/orders',
        title: 'Orders',
        qualifier: settings.tickets,
      },
      {
        key: 'browse',
        route: '/browse',
        title: 'Browse',
        qualifier: settings.browsePage,
      },
      {
        key: 'dashboard',
        route: '/dashboard',
        title: 'Dashboard',
      },
      {
        key: 'account',
        route: '/account/profile',
        title: 'Account',
      },
      {
        key: 'signout',
        title: 'Sign Out',
        isLogout: true,
      },
    ];
  };

  renderInitials = option => {
    let value;
    if (option.avatarType === 'user') {
      value = option ? option.title[0] : '';
      if (value !== undefined) value = value.toUpperCase();
    }
    if (option.avatarType === 'organization') {
      value = 'D';
    }
    return value;
  };
  render() {
    const open = Boolean(this.state.anchorEl);
    const { classes, userEmail } = this.props;
    const options = this.optionsGenerator(userEmail);
    return (
      <div>
        <IconButton
          aria-label="Account Menu"
          onClick={this.handleClick}
          classes={{ root: classes.iconButtonRoot }}
        >
          <Svg icon="Account" />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              maxHeight: 306,
              width: 200,
              top: '64px !important',
            },
          }}
        >
          {options.map(
            option =>
              option.qualifier !== false ? (
                <div key="0" className={classes.focusHotfix}>
                  <div>
                    {option.avatarType ? (
                      <div
                        className={classnames(
                          classes.avatarCircle,
                          option.avatarType === 'user' && classes.avatarUser,
                          option.avatarType === 'organization' &&
                            classes.avatarOrganization,
                        )}
                      >
                        <span className={classes.initials}>
                          {this.renderInitials(option)}
                        </span>
                      </div>
                    ) : null}
                    <MenuItem
                      key={option.key}
                      classes={{
                        root: classnames(
                          classes.menuItemRoot,
                          option.avatarType && classes.avatarShift,
                        ),
                      }}
                      onClick={() =>
                        this.handleNavigation(
                          option.route,
                          option.noRoute,
                          option.isLogout,
                        )
                      }
                      selected={false}
                      button={option.key !== 'user'}
                    >
                      {option.title}
                    </MenuItem>
                  </div>
                  {option.avatarType === 'user' ? (
                    <hr
                      style={{ margin: '0 auto', width: 70, border: '1px solid #00aeef' }}
                    />
                  ) : null}
                  {option.avatarType === 'organization' ? (
                    <hr
                      style={{ margin: '0 auto', width: 70, border: '1px solid #00aeef' }}
                    />
                  ) : null}
                </div>
              ) : (
                <div key="0" />
              ),
          )}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({ userEmail: state.auth.email });

export default compose(
  withStyles(styles),
  graphql(logoutMutation),
  connect(
    mapStateToProps,
    null,
  ),
)(AccountNavigationMenu);
