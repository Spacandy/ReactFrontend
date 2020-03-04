/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Page.css';

type PropsType = {
  title: string,
  html: string,
};

type DefaultPropsType = {};

type StateType = {};

class Page extends React.Component<DefaultPropsType, PropsType, StateType> {
  static defaultProps: DefaultPropsType;
  props: PropsType;
  state: StateType;

  render() {
    const { title, html } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Page);
