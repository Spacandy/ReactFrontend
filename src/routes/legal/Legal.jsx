/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Link from 'components/Link';

const styles = theme => ({
  root: {
    height: '100%',
  },
  title: {
    position: 'relative',
    width: '100%',
    height: '150px',
    paddingTop: '80px',
    background:
      'linear-gradient(135deg, #facf94 0%,#ff7bb6 33%,#cd50ec 69%,#7dc9ff 100%)',

    '&>h1': {
      position: 'absolute',
      right: 0,
      bottom: '30px',
      left: 0,
      fontFamily: 'Roboto, Arial, sans-serif',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(36),
      color: '#fffffe',
      textAlign: 'center',
    },
  },
});

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <h1
            style={{
              position: 'absolute',
              right: 0,
              bottom: '30px',
              left: 0,
              fontFamily: 'Roboto, Arial, sans-serif',
              color: '#fffffe',
              textAlign: 'center',
            }}
          >
            EventHi Legal Center
          </h1>
        </div>
        <List>
          <ListItem>
            <Link to="/legal/terms-of-services">
              <h1 style={{ fontSize: 24, color: '#00aeef', fontFamily: 'Roboto' }}>
                Terms of Service
              </h1>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/legal/terms-of-use">
              <h1 style={{ fontSize: 24, color: '#00aeef', fontFamily: 'Roboto' }}>
                Terms of Use
              </h1>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/legal/privacy-policy">
              <h1 style={{ fontSize: 24, color: '#00aeef', fontFamily: 'Roboto' }}>
                Privacy Policy
              </h1>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/legal/merchant-policy">
              <h1 style={{ fontSize: 24, color: '#00aeef', fontFamily: 'Roboto' }}>
                Merchant Policy
              </h1>
            </Link>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Register);
