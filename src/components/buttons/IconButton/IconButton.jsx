//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: {
    logo: {},
  },
};

const styles = {
  logo: {
    height: 40,
    paddingLeft: 10,
    margin: '12px 0',
    cursor: 'pointer',
  },
};
const IconButton = (props: Props) => (
  <img
    className={props.classes.logo}
    alt=""
    src={'https://d3rd29nk50moi4.cloudfront.net/icon.png'}
  />
);

export default withStyles(styles)(IconButton);
