import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import cookieLove from 'cookie_love.svg';

const styles = theme => ({
  root: {
    maxWidth: 420,
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing.unit * 2,
    outline: 'none',
    zIndex: 2000,
  },
  media: {
    padding: theme.spacing.unit,
    height: 180,
    textAlign: 'center',
    '& > img': {
      height: '100%',
      width: 'auto',
    },
  },
  content: {
    padding: theme.spacing.unit,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing.unit,
  },
});

class CookiesNotification extends Component {
  state = {
    open: false,
  };

  componentDidMount = () => {
    if (!Cookies.get('consent')) {
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    Cookies.set('consent', 'true');
    return this.setState({ open: false });
  };

  render() {
    if (!this.state.open) {
      return null;
    }

    return (
      <Paper className={this.props.classes.root} elevation={3}>
        <div className={this.props.classes.media}>
          <img alt="Cookies" src={cookieLove} width={215} />
        </div>
        <div className={this.props.classes.content}>
          <Typography variant="body1">
            We use Cookies to ensure that we give you the best experience on our website.
            Read our{' '}
            <a
              className={this.props.classes.link}
              href="/legal/privacy-policy"
              target="_blank"
            >
              Privacy Policy
            </a>
            .
          </Typography>
        </div>
        <div className={this.props.classes.actions}>
          <Button
            className={this.props.classes.agreeButton}
            color="primary"
            onClick={this.handleClose}
            variant="contained"
          >
            I Agree
          </Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(CookiesNotification);
