//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import formatDateLong from 'helpers/dates/formatDateLong';
import formatTime from 'helpers/times/formatTime';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment-timezone';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

const styles = () => ({
  paper: {
    top: 0,
    width: '100%',
    height: '100%',
    padding: '15px 15px 5px',
  },
  eventRow: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    fontSize: '1.05rem',
  },
  eventSchedule: {
    display: 'block',
    padding: '0 0 10px 10px',
    '& div': {
      paddingLeft: '15px',
    },
    '& p': {
      margin: '2px',
      fontSize: '1rem',
      fontFamily: 'Roboto',
      fontWeight: 300,
      // color: '#fff',
    },
  },
  eventLocation: {
    display: 'block',
    padding: '0 0 10px 10px',
    '& p:nth-child(1)': {
      paddingLeft: '0',
    },
    '& p': {
      margin: '2px',
      paddingLeft: '15px',
      fontSize: '1rem',
      fontFamily: 'Roboto',
      fontWeight: 300,
      // color: '#fff',
    },
  },
  wrapper: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '5px 0',
  },
  chip: {
    margin: '5px !important',
    color: '#fff',
    backgroundColor: '#00aeef !important',
  },
  socialButtonsMobile: {
    display: 'flex',
    margin: '0 auto',
    padding: '15px 0',
    width: '50%',
    '& div': {
      margin: '0 auto',
      padding: '0 2px',
    },
    '@media (min-width:700px)': {
      display: 'none',
      visibility: 'hidden',
    },
  },
  shareButton: {
    cursor: 'pointer',
    '& :hover:not(:active)': {
      opacity: '0.75',
    },
  },
  hide: {
    display: 'none',
    visibility: 'hidden',
  },
});

type Props = {};

const generateWhen = event => {
  let body;

  const header = (
    <p>
      <b>When:</b>
    </p>
  );

  if (
    formatDateLong(event.startDate, event.timezone) ===
    formatDateLong(event.endDate, event.timezone)
  ) {
    body = (
      <div>
        <p>{`${formatDateLong(event.startDate, event.timezone)}`}</p>
        <p>
          {`${formatTime(event.startDate, event.timezone)} - ${formatTime(
            event.endDate,
            event.timezone,
          )} (${moment.tz(event.timezone).zoneAbbr()})`}
        </p>
      </div>
    );
  } else {
    body = (
      <div>
        <p>{`${formatDateLong(event.startDate, event.timezone)} ${formatTime(
          event.startDate,
          event.timezone,
        )} - `}</p>
        <p>
          {`${formatDateLong(event.endDate, event.timezone)} ${formatTime(
            event.endDate,
            event.timezone,
          )} (${moment.tz(event.timezone).zoneAbbr()})`}
        </p>
      </div>
    );
  }

  return [header, body];
};
const generateWhere = event => {
  let addressName;
  let streetAddress;
  let location;

  const header = (
    <p>
      <b>Where:</b>
    </p>
  );

  if (event.locationData.type === 'physical') {
    if (event.hideLocation) {
      addressName = null;
      streetAddress = <p>Private Location</p>;
    } else {
      if (event.locationData.addressName) {
        addressName = <p>{event.locationData.addressName}</p>;
      }
      if (event.locationData.streetAddress) {
        streetAddress = <p>{event.locationData.streetAddress}</p>;
      }
    }
  }

  if (event.locationData.type === 'online') {
    location = <p>Online Event</p>;
  } else {
    location = <p>{`${event.location}`}</p>;
  }

  return [header, addressName, streetAddress, location];
};

const EventDetailsInfo = (props: Props) => (
  <Paper className={props.classes.paper}>
    <div className={props.classes.eventRow}>
      <div className={props.classes.eventSchedule}>{generateWhen(props.event)}</div>
      <div className={props.classes.eventLocation}>{generateWhere(props.event)}</div>
    </div>
    <div className={props.classes.wrapper}>
      {props.event
        ? props.event.categories
            .sort((a, b) => {
              return a.length - b.length;
            })
            .map(category => (
              <Chip key={category.key} className={props.classes.chip} label={category} />
            ))
        : null}
    </div>
    {props.event.cannabisConsumption ? (
      <div>
        <Tooltip title="Cannabis consumption is allowed at this event.">
          <Chip
            avatar={<Avatar src="https://d3rd29nk50moi4.cloudfront.net/green.svg" />}
            label="Consumption"
            className={props.classes.chip}
          />
        </Tooltip>
      </div>
    ) : (
      <div>
        <Tooltip title="Cannabis consumption is not allowed at this event">
          <Chip
            avatar={<Avatar src="https://d3rd29nk50moi4.cloudfront.net/red.svg" />}
            label="Non-Consumption"
            className={props.classes.chip}
          />
        </Tooltip>
      </div>
    )}
    <div
      className={classNames(
        props.classes.socialButtonsMobile,
        props.event.private && !props.event.allowShare && props.classes.hide,
      )}
    >
      <FacebookShareButton
        className={props.classes.shareButton}
        hashtag="#eventhi"
        url={`https://www.eventhi.io/event/${props.event.slug}`}
        quote={`${props.event.name} on ${formatDateLong(
          props.event.startDate,
          props.event.timezone,
        )} | ${props.event.location}`}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton
        className={props.classes.shareButton}
        url={`https://www.eventhi.io/event/${props.event.slug}`}
        title={`${props.event.name}`}
        description={`${props.event.name} on ${formatDateLong(
          props.event.startDate,
          props.event.timezone,
        )} | ${props.event.location}`}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TwitterShareButton
        className={props.classes.shareButton}
        title={`${props.event.name} on ${formatDateLong(
          props.event.startDate,
          props.event.timezone,
        )} | ${props.event.location} at`}
        url={`https://www.eventhi.io/event/${props.event.slug}`}
        hashtags={['eventhi']}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  </Paper>
);

export default withStyles(styles)(EventDetailsInfo);
