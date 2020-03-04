//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import theme from './SponsorshipStep.css';

type PropsType = {};

type DefaultPropsType = {};

type StateType = {};

class SponsorshipStep extends Component<DefaultPropsType, PropsType, StateType> {
  static defaultProps: DefaultPropsType;
  props: PropsType;
  state: StateType;

  render() {
    return (
      <div>
        <span>{'SponsorshipStep'}</span>
      </div>
    );
  }
}

export default withStyles(theme)(SponsorshipStep);
