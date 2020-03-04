//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import theme from './LogoButton.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const IconButton = props => (
  <img className={theme.logo} src={'https://d3rd29nk50moi4.cloudfront.net/ehibeta-icon.png'} />
);

export default withStyles(theme)(IconButton);
