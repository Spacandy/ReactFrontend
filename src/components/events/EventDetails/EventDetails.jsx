//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import EventBox from 'components/events/EventBox';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import EventDetailsHelmet from './EventDetailsHelmet';
import EventDetailsStickyNavbar from './EventDetailsStickyNavbar';
import EventDetailsHost from './EventDetailsHost';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsDescription from './EventDetailsDescription';

import { setPurchaseTicketModalState } from 'actions/modals/purchaseTicketsModal';

import { mediaEndpoint } from 'data/endpoints';

const styles = {
  body: {
    marginTop: '82px',
    fontFamily: 'Roboto',
    backgroundColor: '#fafafa',
  },
  card: {
    boxShadow: 'unset',
  },
  listItem: {
    margin: '0 auto',
  },
  eventInfoGrid: {
    '@media (max-width: 750px)': {
      display: 'none',
    },
  },
  eventInfoHidden: {
    width: '100%',
    '@media (min-width: 750px)': {
      display: 'none',
    },
  },
  eventInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    justifyContent: 'space-between',
  },
  responsiveImage: {
    maxWidth: '100%',
    position: 'relative',
    margin: '0 auto',
  },
  more: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 0,
  },
  moreWrapper: {
    paddingTop: 10,
    marginTop: 30,
  },
  responsiveImage__image: {
    position: 'absolute',
    // borderRadius: '7px 7px 0 0',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '100%',
    margin: '0 auto',
    '@media (max-width: 950px)': {
      borderRadius: '0',
    },
  },

  myPaper: {
    width: '100%',
    height: '100%',
    borderRadius: '7px',
    margin: '0 auto',
    minWidth: '320px',
    '@media (min-width: 1024px)': {
      width: '85%',
    },
  },
  imageWrapper: {
    '@media (max-width: 750px)': {
      maxWidth: '100%',
      flexBasis: '100%',
    },
  },

  xs: {
    width: '100%',
    margin: '0 auto',
    '@media (max-width: 480px)': {
      marginTop: 20,
      paddingTop: 0,
    },
    '@media (min-width: 1600px)': {
      width: '72% !important',
      margin: '0 auto',
    },
  },
};

type PropsType = {
  event: {
    name: string,
    slug: string,
    hostname: string,
    description: string,
    categories: Array,
    location: string,
    locationData: {
      name: string,
      streetAddress: string,
      addressLocality: string,
      addressRegion: string,
      addressCountry: string,
      postalCode: string,
    },
    private: string,
    startDate: string,
    endDate: string,
    image: string,
    tickets: Array,
    type: string,
    organizer: string,
    refundPolicy: number,
    contactEmail: string,
    lowestTicketPrice: string,
  },
};

type StateType = {};

const ResponsiveImage = ({ src, alt, width, height, classes }) => {
  return (
    <div
      className={classes.responsiveImage}
      style={{
        width,
      }}
    >
      <div
        style={{
          paddingBottom: `${(height / width) * 100}%`,
        }}
      />
      {src ? (
        <img
          src={`${mediaEndpoint}${src}`}
          className={classes.responsiveImage__image}
          alt={alt}
        />
      ) : null}
    </div>
  );
};

class EventDetails extends React.Component<DefaultPropsType, PropsType, StateType> {
  state: StateType;
  props: PropsType;

  handleBuyClick = async () => {
    this.props.dispatch(
      setPurchaseTicketModalState(
        true,
        this.props.event.id,
        this.props.event.tickets,
        this.props.event.timezone,
      ),
    );
  };

  handleContactClick = () => {
    if (window) {
      window.location.href = `mailto:${this.props.event.contactEmail}`;
    } else {
      console.warn('window object not available');
    }
  };

  constructStringQuery = e => {
    const street = e.locationData.streetAddress.split(' ').join('+');
    const city = e.location.split(' ').join('');

    if (e.hideLocation) return `${city}`;

    if (e.id === '946' || e.id === '1016')
      return 'Camp+Navarro+901+Masonite+Industrial+Rd,Navarro,CA';

    return `${street},${city}`;
  };
  generateEvent = (event, className = null) => (
    <Grid className={className} item xs={12} sm={6} md={4} lg={3}>
      <EventBox
        id={event.id}
        slug={event.slug}
        key={event.slug}
        image={event.image}
        name={event.name}
        location={event.location}
        schedule={event.schedule}
        tickets={event.tickets}
        lowestTicketPrice={event.lowestTicketPrice}
        timezone={event.timezone}
      />
    </Grid>
  );
  propagateRelatedEvents = (events, className) => {
    const generatedEvents = [];

    if (events)
      events.map(event => generatedEvents.push(this.generateEvent(event, className)));
    return generatedEvents;
  };

  render() {
    const { classes } = this.props;

    const locationQuery = this.props.event
      ? this.constructStringQuery(this.props.event)
      : null;

    const relatedEvents = this.propagateRelatedEvents(
      this.props.event.relatedEvents || [],
      classes.listItem,
    );

    return (
      <div>
        <EventDetailsHelmet
          event={this.props.event}
          schema={this.props.schema}
          mediaEndpoint={mediaEndpoint}
        />
        <Paper className={classes.myPaper}>
          <div className={classes.card}>
            <Grid container direction="column">
              <Grid container direction="row">
                <Grid
                  className={classes.imageWrapper}
                  spacing={16}
                  item
                  xs={8}
                  sm={8}
                  md={8}
                >
                  <ResponsiveImage
                    src={this.props.event.image}
                    mediaEndpoint={mediaEndpoint}
                    alt={this.props.event.name}
                    width={1024}
                    height={576}
                    classes={classes}
                  />
                </Grid>
                <Hidden xsDown>
                  <Grid
                    className={classes.eventInfoGrid}
                    direction="row"
                    item
                    spacing={16}
                    xs={4}
                    sm={4}
                    md={4}
                  >
                    <EventDetailsInfo event={this.props.event} />
                  </Grid>
                </Hidden>
              </Grid>
              <Grid container spacing={0} direction="row">
                <EventDetailsStickyNavbar
                  event={this.props.event}
                  handleBuyClick={this.handleBuyClick}
                />
                <div className={classes.eventInfoHidden}>
                  <EventDetailsInfo event={this.props.event} />
                </div>
                <Grid item xs={12}>
                  <EventDetailsDescription
                    event={this.props.event}
                    locationQuery={locationQuery}
                  />
                </Grid>
                <Grid item xs={12}>
                  <EventDetailsHost
                    event={this.props.event}
                    handleContactClick={this.handleContactClick}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Paper className={classes.myPaper}>
          <div className={classes.moreWrapper}>
            <h2 className={classes.more}>More Events You May Like</h2>
            <Grid classes={{ 'spacing-xs-24': classes.xs }} container spacing={24}>
              {relatedEvents}
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EventDetails);
