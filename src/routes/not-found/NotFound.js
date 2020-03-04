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
import notFoundSVG from 'page_not_found.svg';
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

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Typography variant="title" align="center" component="h1">
          404: The page you are looking for isn’t here
        </Typography>
        <div className={this.props.classes.imageContainer}>
          <img
            alt="Under development"
            className={this.props.classes.image}
            src={notFoundSVG}
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

export default withStyles(styles)(NotFound);
