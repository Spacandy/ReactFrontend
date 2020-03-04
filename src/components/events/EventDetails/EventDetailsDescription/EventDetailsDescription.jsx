//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import ReactPlayer from 'react-player';

const styles = () => ({
  superWrapper: {
    margin: '0 auto',
    '&>h2': {
      fontFamily: 'Roboto, sans-serif',
      textAlign: 'center',
      paddingTop: '40px',
    },
  },
  eventDetails: {
    margin: '0 auto',
    paddingTop: '40px',
    width: '80%',
    fontSize: '18px',
    fontFamily: 'Roboto !important',
    fontWeight: 300,
    lineHeight: '1.6',
    '& img': {
      maxWidth: '100% !important',
      height: 'auto',
      display: 'block',
    },
  },
  refundPolicy: {
    width: '75%',
    margin: '40px auto 0',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
  },
});

type Props = {};

let pattern = /^((http|https|ftp):\/\/)/;

const EventDetailsDescription = (props: Props) => (
  <div className={props.classes.superWrapper}>
    <h2
      style={{
        fontFamily: 'Roboto, sans-serif',
        textAlign: 'center',
        paddingTop: '40px',
      }}
    >
      Description
    </h2>
    <hr
      style={{
        width: '10%',
        borderColor: '#00aeef',
      }}
    />
    <div
      className={props.classes.eventDetails}
      dangerouslySetInnerHTML={{
        __html: `${props.event.description}`,
      }}
    />
    {props.event.video_url && props.event.video_url !== '' ? (
      <div style={{ display: 'flex' }}>
        <ReactPlayer
          style={{
            maxWidth: 640,
            height: 360,
            margin: '40px auto 0',
            width: '100%',
          }}
          url={props.event.video_url}
          controls
        />
      </div>
    ) : null}
    <div className={props.classes.refundPolicy}>
      <h3>Refund Policy</h3>
      <p>
        {props.event.refundPolicy === 0
          ? 'This event does not accept refunds'
          : `This event accepts refunds until ${
              props.event.refundPolicy
            } day(s) before the event.`}
      </p>
    </div>
    {props.event.location && !pattern.test(props.event.location) ? (
      <div style={{ display: 'flex' }}>
        <iframe
          frameBorder="0"
          style={{
            maxWidth: 500,
            height: 360,
            margin: '40px auto 0',
            width: '100%',
          }}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBQHgLhBpHbqa7h6hGHw6y1BKCGE-t6fLs
  &q=${props.locationQuery}`}
          allowFullScreen
          title={`${props.event.name}`}
        />
      </div>
    ) : null}
  </div>
);

export default withStyles(styles)(EventDetailsDescription);
