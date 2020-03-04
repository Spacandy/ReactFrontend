//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import theme from './DashboardSponsorshipsSection.css';
import SponsorshipsTable from 'components/dashboard/SponsorshipsTable';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';

type PropsType = {
  eventId: number,
};

type DefaultPropsType = {};

type StateType = {};

class DashboardSponsorshipsSection extends Component<DefaultPropsType, PropsType, StateType> {
  static defaultProps: DefaultPropsType;
  props: PropsType;
  state: StateType;

  render() {
    return (
      <div>
        <SponsorshipsTable email={this.props.email} eventId={this.props.eventId} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    eventId: state.event.dashboardEvent ? state.event.dashboardEvent.eventId : 0,
    email: state.auth.email,
  };
};

export default compose(withStyles(theme), connect(mapStateToProps, null))(
  DashboardSponsorshipsSection,
);
