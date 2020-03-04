//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import theme from './Event.css';
import EventDetails from 'components/events/EventDetails';
import { Helmet } from 'react-helmet';

type Propstype = {};

type Statetype = {};

class Event extends React.Component<PropsType, StateType> {
  props: Propstype;
  state: Statetype;

  render() {
    let { name, slug, startDate, location, image } = this.props.event;
    return [
      <EventDetails
        event={this.props.event}
        schema={this.props.schema}
        openSignupModal={this.props.openSignupModal}
        id={this.props.id}
      />,
    ];
  }
}

export default withStyles(theme)(Event);
