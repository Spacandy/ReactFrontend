//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import theme from "./Profile.css";

type Propstype = {};

type Statetype = {};

class Profile extends React.Component<PropsType, StateType> {
  props: Propstype;
  state: Statetype;

  render() {
    var childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { eventId: this.state.eventId }));
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

export default withStyles(theme)(Profile);
