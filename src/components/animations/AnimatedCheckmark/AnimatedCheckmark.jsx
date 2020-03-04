//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import theme from './AnimatedCheckmark.css';

type PropsType = {};

const AnimatedCheckmark = (props: PropsType) => (
  <svg className={theme.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
    <circle className={theme['checkmark-circle']} cx="26" cy="26" r="25" fill="none" />
    <path
      className={theme['checkmark-check']}
      fill="none"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
    />
  </svg>
);

export default withStyles(theme)(AnimatedCheckmark);
