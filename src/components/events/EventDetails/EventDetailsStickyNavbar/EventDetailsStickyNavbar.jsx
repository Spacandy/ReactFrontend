//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import formatDateLong from 'helpers/dates/formatDateLong';

import isStarted from 'helpers/ticketTypes/isStarted';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

const styles = () => ({
  eventTitle: {
    display: 'block',
    flex: 1,
    maxWidth: '60%',
    fontWeight: 'bolder',
    '@media (max-width: 540px)': {
      '& h2': {
        fontSize: '1rem',
        padding: '5px 0',
      },
    },
  },
  socialButtons: {
    display: 'flex',
    margin: '0 auto',
    width: '15%',
    '& div': {
      margin: '0 auto',
      padding: '0 1px',
    },
    '@media (max-width:700px)': {
      visibility: 'hidden',
      display: 'none',
    },
    shareButton: {
      cursor: 'pointer',
      '& :hover:not(:active)': {
        opacity: '0.75',
      },
    },
  },
  eventButtons: {
    padding: '15px 0 15px 15px',
    // color: 'white !important',
    '& span': {
      // color: 'white !important',
    },
  },
  hide: {
    display: 'none',
    visibility: 'hidden',
  },
});

type Props = {};

const getMinPrice = data => {
  const getPrices = ft => ft.map(d => d.price);

  const { timezone, id } = data;

  const filteredTickets = data.tickets.filter(
    da => isStarted(da.salesStart, timezone) && isStarted(da.salesStart, timezone),
  );

  const activeTickets = filteredTickets.filter(da => da.active);

  // Show no price for kushstock 7 and michigan's sponsorship pages
  if (
    id === '812' ||
    id === '813' ||
    id === '1112' ||
    id === '1244' ||
    id === '1246' ||
    id === '1958' ||
    id === '1881'
  )
    return '';

  // show max price for meadowlands
  if (id === '1109') return '$470';
  if (id === '946') return '$520';
  if (id === '1074') return `$420`;
  if (id === '1107') return `$200`;
  if (id === '1880') return `$5-$7000`;

  if (Math.min(...getPrices(activeTickets)) === 0) return 'FREE';
  if (Math.min(...getPrices(activeTickets)) === Infinity) return '';

  return `$${Math.min(...getPrices(activeTickets))}`;
};

const determineButtonText = event => {
  const PAY_NOW = 'PAY NOW';
  const TICKETS = 'TICKETS';
  const RSVP = 'RSVP';
  console.log(event);

  const notFree = element => Number(element.price) > 0;

  if (event.tickets.length > 0 && event.tickets[0].itemType === 'sponsorship')
    return PAY_NOW;

  if (event.canceled)
    // If event is cancelled
    return 'CANCELED';
  // Kushstock 7 sponsorship page
  if (
    event.id === '812' ||
    event.id === '813' ||
    event.id === '1055' ||
    event.id === '1102' ||
    event.id === '1112' ||
    event.id === '1170' ||
    event.id === '1244' ||
    event.id === '1245' ||
    event.id === '1246' ||
    event.id === '1262' ||
    event.id === '1268' ||
    event.id === '1288' ||
    event.id === '1361' ||
    event.id === '1382' ||
    event.id === '1435' ||
    event.id === '1453' ||
    event.id === '1472' ||
    event.id === '1473' ||
    event.id === '1750' ||
    event.id === '1880' ||
    event.id === '1881' ||
    event.id === '1958' ||
    event.id === '1959' ||
    event.id === '1904'
  )
    return PAY_NOW;
  // Kushstock 7 page
  if (event.id === '687' || event.id === '1846' || event.id === '1847') return TICKETS;
  // If event if free
  if (event.lowestTicketPrice === 'FREE') return RSVP;
  // If none of the above apply
  return TICKETS;
};

const EventDetailsStickyNavbar = (props: Props) => (
  <AppBar position="sticky" component="div" color="inherit">
    <Toolbar>
      <div className={props.classes.eventTitle}>
        <Typography variant="title" noWrap>
          {props.event.name}
        </Typography>
      </div>
      <div
        className={classNames(
          props.classes.socialButtons,
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
          <FacebookIcon size={24} round />
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
          <LinkedinIcon size={24} round />
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
          <TwitterIcon size={24} round />
        </TwitterShareButton>
      </div>
      <Typography variant="body2">{getMinPrice(props.event)}</Typography>
      <div className={props.classes.eventButtons}>
        {props.event.id === '354' ? null : (
          <Button
            color="primary"
            aria-label="Tickets"
            variant="raised"
            style={props.event.canceled ? { color: 'rgba(0, 0, 0, 0.67)' } : null}
            disabled={props.event.canceled}
            onClick={props.handleBuyClick}
          >
            {determineButtonText(props.event)}
          </Button>
        )}
      </div>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(EventDetailsStickyNavbar);
