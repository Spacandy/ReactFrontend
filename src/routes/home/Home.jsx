//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow
import React from 'react';
import Helmet from 'react-helmet';
import EventBox from 'components/events/EventBox';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { setPurchaseTicketModalState } from 'actions/modals/purchaseTicketsModal';
import { setPurchaseCongratsModalState } from 'actions/modals/purchaseCongratsModal';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import homeEventsQuery from './homeEvents.graphql';
import { isRelease } from 'settings';
import { mediaEndpoint } from 'data/endpoints';
import isStarted from 'helpers/ticketTypes/isStarted';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import jumboimg from './jumbotron.svg';
import SearchIcon from '@material-ui/icons/Search';
import { colors } from '@material-ui/core';
import ReactPaginate from 'react-paginate';
// import homeEventsQuery from './homeEvents.graphql';
// import history from 'localHistory';

type Props = {
  congratulationsDialogOpen: boolean,
  authenticated: boolean,
  openSignupModal: boolean,
  dispatch: Dispatch,
  client: {
    query: Function,
  },
  data: {
    homeEvents: {
      filter: Function,
    },
  },
};

type State = {
  events: [Event],
};

const styles = theme => ({
  xs: {
    width: '100%',
    paddingTop: 60,
    margin: 0,
    '@media (max-width: 480px)': {
      marginTop: 20,
      paddingTop: 0,
    },
    '@media (min-width: 1600px)': {
      width: '72% !important',
      margin: '0 auto',
    },
  },
  listItem: {
    height: 400,
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: '0 auto',
  },
  searchIcon: {
    marginRight: theme.spacing.unit,
    color: 'inherit',
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit',
    },
  },
  root: {
    ...theme.typography.button,
    listStyle: 'none',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  active: {},
  activeLink: {},
  break: {},
  breakLink: {},
  disabled: {},
  next: {
    marginLeft: theme.spacing.unit,
  },
  nextLink: {
    padding: '6px 16px',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: 4,
    '&:hover': {
      backgroundColor: colors.blueGrey[50],
    },
  },
  page: {},
  pageLink: {
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit,
    outline: 'none',
    cursor: 'pointer',
    width: 20,
    height: 20,
    borderRadius: '50%',
    display: 'block',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: colors.blueGrey[50],
      color: theme.palette.text.primary,
    },
    '&$activeLink': {
      backgroundColor: colors.blueGrey[50],
      color: theme.palette.text.primary,
    },
  },
  previous: {
    marginRight: theme.spacing.unit,
  },
  previousLink: {
    padding: '6px 16px',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: 4,
    '&:hover': {
      backgroundColor: colors.blueGrey[50],
    },
  },
  paginate: {
    marginTop: -60,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  jumbotron: {
    position: 'relative',
    backgroundImage: 'url(https://d3rd29nk50moi4.cloudfront.net/spacebg.jpg)',
    backgroundSize: 'cover',
    height: 439,
  },
  headline: {
    margin: '30px auto 0',
    fontFamily: 'Roboto, sans-serif',
    color: 'white',
    textAlign: 'center',
    fontWeight: 300,
    padding: '5px 5px 0',
    fontSize: '1.7em',
  },
  summary: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    margin: '0 auto',
    color: 'white',
    fontWeight: 300,
  },
  space: {
    '& img': {
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 'auto',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '80%',
      margin: 'auto auto 0',
    },
  },
  '@media (max-width: 480px)': {
    jumbotron: {
      display: 'none !important',
    },
  },
});

class Home extends React.Component<Props, State> {
  state: State = {
    homeEventsObject: null,
    pageCount: 0,
    activePage: 0,
    searchTerm: '',
  };

  props: Props;

  UNSAFE_componentWillMount() {
    this.setState({
      homeEventsObject: this.props.events,
      pageCount: this.props.pageCount,
    });
  }

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
        search
      />
    </Grid>
  );

  propagateBetaEvents = (events, className) => {
    const generatedEvents = [];

    if (events)
      events.map(event => generatedEvents.push(this.generateEvent(event, className)));
    return generatedEvents;
  };

  getMinPrice = data => {
    const getPrices = ft => ft.map(d => d.price);

    const { timezone } = data;

    const filteredTickets = data.tickets.filter(da => !isStarted(da.salesEnd, timezone));
    const activeTickets = filteredTickets.filter(da => da.active);

    if (Math.min(...getPrices(activeTickets)) === 0) return 'FREE';
    if (Math.min(...getPrices(activeTickets)) === Infinity) return '';

    return `$${Math.min(...getPrices(activeTickets))}`;
  };

  handleCongratulationsClose = () => {
    this.props.dispatch(setPurchaseCongratsModalState(false));
    this.props.dispatch(setPurchaseTicketModalState(false, null, null, null));
  };
  constructEventQuery = (page, term) => {
    if (term && term.length > 0) return `?search=${term}&limit=12&offset=${page * 12}`;
    return `?limit=12&offset=${page * 12}`;
  };

  fetchEvents = (pageNumber, searchTerm) => {
    return axios
      .get(
        `https://be.eventhi.io/events/home${this.constructEventQuery(
          pageNumber,
          searchTerm,
        )}`,
      )
      .then(response => {
        return this.setState({
          homeEventsObject: response.data.results,
          pageCount: Math.ceil(response.data.count / 12),
          searchTerm,
          activePage: pageNumber,
        });
      });
  };

  generateListItemData = hostedEvents => {
    let processedEvents = [];

    if (hostedEvents) {
      hostedEvents.map(({ name, image, slug }, index) => {
        processedEvents.push({
          '@type': 'ListItem',
          additionalType: 'Event',
          position: Number(index) + 1,
          name,
          image: `${mediaEndpoint}${image}`,
          url: `https://www.eventhi.io/event/${slug}`,
        });
      });

      return {
        '@context': 'http://schema.org',
        '@type': 'ItemList',
        itemListElement: processedEvents,
      };
    }
    return [];
  };

  render() {
    // let { generatedFeatured, generatedPopular, generatedFree } = this.propagateEvents(
    //   this.props.data.homeEvents,
    // );
    const { classes } = this.props;

    const betaEvents = this.propagateBetaEvents(
      this.state.homeEventsObject || [],
      classes.listItem,
    );
    const siteMetadata = {
      '@context': `http://schema.org`,
      '@type': 'WebSite',
      name: 'EventHi',
      alternateName: 'EventHi Inc',
      url: `https://www.eventhi.io`,
    };

    const orgMetadata = {
      '@context': `http://schema.org`,
      '@type': 'Organization',
      url: `https://www.eventhi.io`,
      logo: `https://d3rd29nk50moi4.cloudfront.net/logo.png`,
      sameAs: [
        'https://www.facebook.com/eventhi.io/',
        'https://twitter.com/eventhi_io',
        'https://www.instagram.com/eventhi.io/',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1-619-738-5100',
          contactType: 'customer service',
        },
      ],
    };
    const listItemData = this.generateListItemData(this.props.events);

    return (
      <div>
        <Helmet>
          <meta property="og:url" content="https://www.eventhi.io/" />
          <meta property="og:title" content="EventHi - Explore a New World of Events." />
          <meta
            property="twitter:title"
            content="EventHi - Explore a New World of Events."
          />
          <meta
            property="twitter:description"
            content="Cannabis event platform to create and coordinate Cannabis events for the Cannabis community. Use our easy ticketing system, sponsor, and sell merchandise."
          />
          <meta
            property="twitter:image"
            content="https://d3rd29nk50moi4.cloudfront.net/logo.png"
          />
          <meta property="twitter:site" content="https://www.eventhi.io" />
          <meta
            property="og:description"
            content="Cannabis event platform to create and coordinate Cannabis events for the Cannabis community. Use our easy ticketing system, sponsor, and sell merchandise."
          />
          <meta
            property="og:image"
            content="https://d3rd29nk50moi4.cloudfront.net/ehibeta-logo.png"
          />
          <meta
            name="description"
            content="Cannabis event platform to create and coordinate Cannabis events for the Cannabis community. Use our easy ticketing system, sponsor, and sell merchandise."
          />
          <script type="application/ld+json">{`${JSON.stringify(siteMetadata)}`}</script>
          <script type="application/ld+json">{`${JSON.stringify(orgMetadata)}`}</script>
          <script type="application/ld+json">{`${JSON.stringify(listItemData)}`}</script>
        </Helmet>

        <div className={this.props.classes.jumbotron}>
          <div className={this.props.classes.space}>
            <img src={jumboimg} alt="Jumbotron" />
          </div>
          <div className={this.props.classes.summary}>
            <div className={this.props.classes.headline}>
              <h1 style={{ fontSize: 27, fontWeight: 300 }}>
                Explore a New World of Events
              </h1>
            </div>

            <div className={this.props.classes.search}>
              <SearchIcon className={this.props.classes.searchIcon} />
              <Input
                className={this.props.classes.searchInput}
                disableUnderline
                placeholder="Search events..."
                onChange={event => this.fetchEvents(0, event.target.value)}
              />
            </div>
          </div>
        </div>
        <Grid classes={{ 'spacing-xs-24': classes.xs }} container spacing={24}>
          {betaEvents}
        </Grid>
        <div className={classes.paginate}>
          <ReactPaginate
            activeClassName={classes.active}
            activeLinkClassName={classes.activeLink}
            breakClassName={classes.break}
            breakLabel="..."
            breakLinkClassName={classes.breakLink}
            containerClassName={classes.root}
            forcePage={this.state.activePage}
            disabledClassName={classes.disabled}
            marginPagesDisplayed={1}
            nextClassName={classes.next}
            nextLinkClassName={classes.nextLink}
            onPageChange={d => this.fetchEvents(d.selected, this.state.searchTerm)}
            pageClassName={classes.page}
            pageCount={this.state.pageCount}
            pageLinkClassName={classes.pageLink}
            pageRangeDisplayed={4}
            previousClassName={classes.previous}
            previousLinkClassName={classes.previousLink}
            subContainerClassName="pages pagination"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  email: state.auth.email,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default compose(
  withStyles(styles),
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Home);
