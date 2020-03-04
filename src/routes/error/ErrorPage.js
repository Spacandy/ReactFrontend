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
import serverDownSVG from 'server_down.svg';
import { Typography, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    paddingTop: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  imageContainer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 300,
    height: 'auto',
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center',
  },
});
class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    error: null,
  };

  render() {
    if (__DEV__ && this.props.error) {
      return (
        <div>
          <h1>{this.props.error.name}</h1>
          <pre>{this.props.error.stack}</pre>
        </div>
      );
    }

    return (
      <div className={this.props.classes.root}>
        <Typography variant="title" align="center" component="h1">
          500: Ooops, something went terribly wrong!
        </Typography>
        <div className={this.props.classes.imageContainer}>
          <img
            alt="Under development"
            className={this.props.classes.image}
            src={serverDownSVG}
          />
        </div>
        <div className={this.props.classes.buttonContainer}>
          <Button color="primary" to="/" variant="outlined">
            Back to home
          </Button>
        </div>
      </div>
    );
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(styles)(ErrorPage);
