//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import moment from 'moment';
import { Typography, Grid, Button, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import growthAnalytics from 'growth_analytics.svg';

type Props = {
  eventId: number,
};

type State = {
  ticket_number: string,
  subject: string,
  message: string,
};

const styles = theme => ({
  root: {
    fontFamily: 'Roboto',
  },
  summaryButton: {
    marginTop: 30,
    backgroundColor: theme.palette.white,
  },
  barChartIcon: {
    marginRight: theme.spacing.unit,
  },
  image: {
    width: '100%',
    maxHeight: 400,
  },
});

class DashboardEventListSection extends Component<Props, State> {
  state: State;
  props: Props;

  greetingText = () => {
    const now = moment();
    const currentHour = now.hour();
    console.log('xxxcurrentHour', currentHour);
    if (currentHour >= 12 && currentHour <= 17) return 'Good Afternoon,';
    else if (currentHour >= 18) return 'Good Evening,';
    else return 'Good Morning,';
  };

  render() {
    console.log('xfirstname', this.props.firstName);
    return (
      <div className={this.props.classes.root}>
        <Grid alignItems="center" container justify="space-between" spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography component="h1" gutterBottom variant="h3">
              {this.greetingText()} {this.props.firstName}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Please select an event
            </Typography>
          </Grid>
          <Hidden smDown>
            <Grid item md={6}>
              <img
                alt="Cover"
                className={this.props.classes.image}
                src={growthAnalytics}
              />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  firstName: state.auth.firstName,
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DashboardEventListSection);
