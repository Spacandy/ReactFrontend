//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import offsetTime from 'helpers/timezones/offsetTimezone';

type Props = {
  classes: {
    typographyRoot: {},
    headline: {},
    title: {},
    subheading: {},
    paper: {},
  },
  eventData: {
    name: string,
    organizer: string,
    hostname: string,
    startDate: string,
    location: string,
  },
};

const CheckoutEventInfo = (props: Props) => (
  <Paper className={props.classes.paper} elevation={4}>
    <Typography variant="display1" classes={{ root: props.classes.typographyRoot }}>
      Event
    </Typography>
    <div style={{ margin: '20px', display: 'table' }}>
      <Typography className={props.classes.headline} variant="headline">
        {props.eventData.name}
      </Typography>
      <Typography className={props.classes.title} variant="title">
        {props.eventData.hostname}
      </Typography>
      <Typography className={props.classes.subheading} variant="subheading">
        {offsetTime(
          props.eventData.startDate,
          props.eventData.timezone,
          'DD-MM-YYYY hh:mm A',
        )}
      </Typography>
      <Typography className={props.classes.subheading} variant="subheading">
        {props.eventData.location}
      </Typography>
    </div>
  </Paper>
);

export default CheckoutEventInfo;
