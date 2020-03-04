//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import theme from "./Support.css";

type Propstype = {};

type Statetype = {};

class Support extends React.Component<PropsType, StateType> {
  props: Propstype;
  state: Statetype;

  render() {
    return <span>{"Support"}</span>;
  }
}

export default withStyles(theme)(Support);
