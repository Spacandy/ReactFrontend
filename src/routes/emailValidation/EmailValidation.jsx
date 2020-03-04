//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import theme from './EmailValidation.css';
import EmailValidationSection from './sections/EmailValidationSection';
type PropsType = {
  children: mixed
};

type DefaultPropsType = {};

type StateType = {};

class EmailValidation extends React.Component<DefaultPropsType, PropsType, StateType> {
  static defaultProps: DefaultPropsType;
  props: PropsType;
  state: StateType;

  render() {
    var childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(
      child,
      {
        /* props go here*/
      }
    ));

    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

export default withStyles(theme)(EmailValidation);
