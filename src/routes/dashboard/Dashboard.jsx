//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import { connect } from 'react-redux';
import { compose, graphql, withApollo } from 'react-apollo';
import history from 'localHistory';
import { destroy, change } from 'redux-form';
import Svg from 'components/Svg';
import SidebarController from 'components/SidebarController';
import classNames from 'classnames';
import DialogContentText from '@material-ui/core/DialogContentText';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SvgIcon from '@material-ui/core/SvgIcon';

import {
  cancelEvent,
  publishEvent,
  edit,
  checkin,
  refunds,
  isRelease,
  dashboardAttendees,
  dashboardSponsorships,
  billing,
} from 'settings';

import ConfirmationDialog from 'components/dialogs/ConfirmationDialog';

import { setEventId, setEventSlug } from 'actions/event';
import { setAccountSidebarState } from 'actions/sidebars/accountSidebar';
import { setDashboardSidebarState } from 'actions/sidebars/dashboardSidebar';

import isEnded from 'helpers/ticketTypes/isEnded';

import hostedEventsQuery from './hostedEvents.graphql';
import cancelEventMutation from './cancelEvent.graphql';
import publishEventMutation from './publishEvent.graphql';

import type { Props, State } from './types';

import stylesGenerator from './styles';

const styles = theme => {
  return stylesGenerator(theme);
};
const editForms = [
  'generalFormEdit',
  'scheduleFormEdit',
  'locationFormEdit',
  'mediaFormEdit',
  'ticketFormEdit',
  'refundsFormEdit',
];

const resetForms = (forms, resetForm) => {
  if (forms.length > 0) forms.map(form => resetForm(form));
};

const setEventState = (
  setState,
  selectedEvent,
  initial = false,
  resetForm = null,
  changeField = null,
) => {
  if (selectedEvent) {
    if (initial) {
      if (resetForm && changeField) {
        resetForms(editForms, resetForm);
        changeField('promoteFormEdit', 'categories', []);
        changeField('promoteFormEdit', 'organizerWebsite', null);
        changeField('promoteFormEdit', 'organizerFacebook', null);
        changeField('promoteFormEdit', 'organizerTwitter', null);
        changeField('promoteFormEdit', 'organizerInstagram', null);
      }
      return {
        eventName: selectedEvent[0].name,
        nameSlug: selectedEvent[0].name_slug,
        eventEnded: isEnded(selectedEvent[0].endsAt, selectedEvent[0].timezone),
        eventCanceled: selectedEvent[0].canceled,
        eventPublished: selectedEvent[0].published,
      };
    }
    if (setState) {
      if (resetForm && changeField) {
        resetForms(editForms, resetForm);
        changeField('promoteFormEdit', 'categories', []);
        changeField('promoteFormEdit', 'organizerWebsite', null);
        changeField('promoteFormEdit', 'organizerFacebook', null);
        changeField('promoteFormEdit', 'organizerTwitter', null);
        changeField('promoteFormEdit', 'organizerInstagram', null);
      }
      return setState(() => ({
        eventName: selectedEvent[0].name,
        nameSlug: selectedEvent[0].name_slug,
        eventEnded: isEnded(selectedEvent[0].endsAt, selectedEvent[0].timezone),
        eventCanceled: selectedEvent[0].canceled,
        eventPublished: selectedEvent[0].published,
      }));
    }
  }
};

class Dashboard extends React.Component<Props, State> {
  static getDerivedStateFromProps = (nextProps, prevState) => {
    const selectedEvent = nextProps.hostedEvents
      ? nextProps.hostedEvents.filter(e => Number(e.id) === Number(nextProps.eventId))
      : null;
    if (nextProps.eventId !== prevState.event) {
      setEventState(
        null,
        selectedEvent,
        true,
        nextProps.resetForm,
        nextProps.changeField,
      );
    }
    setEventState(null, selectedEvent, true, nextProps.resetForm, nextProps.changeField);
  };

  state: State = {
    event: null,
    confirmationDialogSubject: 'cancel',
    confirmationDialogOpen: false,
    width: '100%',
    maxWidth: 360,
    eventName: '',
    eventSlug: '',
    eventCanceled: false,
    eventPublished: false,
    eventEnded: false,
    hostedEvents: [],
    startDate: '',
    published: null,
    canceled: null,
    dataLoaded: false,
  };
  props: Props;

  componentDidMount = () => {
    this.props.client
      .query({
        query: hostedEventsQuery,
        fetchPolicy: 'network-only',
      })
      .then(response => {
        this.setState({
          hostedEvents: response.data.hostedEvents,
        });
        this.setEventData(
          response.data.hostedEvents,
          this.props.eventId,
          this.props.resetForm,
          this.props.changeField,
        );
      });
  };

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  gaSendEvent = (category, action, email) => {
    if (isRelease && window) {
      return window.ga('send', 'event', category, action, email);
    }
    return null;
  };

  handleChange = ({
    id,
    name,
    canceled,
    timezone,
    published,
    endsAt,
    name_slug,
  }) => event => {
    resetForms(editForms, this.props.resetForm);
    this.props.changeField('promoteFormEdit', 'categories', []);
    this.props.changeField('promoteFormEdit', 'organizerWebsite', null);
    this.props.changeField('promoteFormEdit', 'organizerFacebook', null);
    this.props.changeField('promoteFormEdit', 'organizerTwitter', null);
    this.props.changeField('promoteFormEdit', 'organizerInstagram', null);
    this.props.setEventId(id);
    this.props.setEventSlug(name_slug, published);
    this.setState({
      open: false,
      anchorEl: event.currentTarget,
      event: event.currentTarget.value,
      eventName: name,
      eventSlug: name_slug,
      eventEnded: isEnded(endsAt, timezone),
      eventCanceled: canceled,
      eventPublished: published,
      dataLoaded: true,
    });
    history.push('/dashboard/analytics');
    this.gaSendEvent('Dashboard', 'Event Selected', this.props.email);
  };

  handleCancelEventClick = () => {
    return this.setState(() => ({
      confirmationDialogSubject: 'cancel',
      confirmationDialogOpen: true,
    }));
  };

  handleConfirmDismiss = () => {
    this.setState({ confirmationDialogOpen: false });
  };

  handleConfirmCancelEvent = () => {
    this.props
      .cancelEventMutation({
        variables: {
          eventId: this.state.event.id,
        },
      })
      .then(({ data }) => {
        this.setState({
          confirmationDialogOpen: false,
          event: { ...this.state.event, canceled: true },
        });
      })
      .catch(error => {
        console.error(`there was an error mutating ${JSON.stringify(error)}`);
      });
  };

  handlePublishEvent = eventId => {
    this.props
      .publishEventMutation({
        variables: {
          eventId,
        },
        refetchQueries: [{ query: hostedEventsQuery }],
      })
      .then(() => {
        this.setState(() => ({
          confirmationDialogSubject: 'publish',
          confirmationDialogOpen: true,
          eventPublished: true,
        }));
      })
      .catch(error => {
        console.error(`there was an error mutating ${JSON.stringify(error)}`);
      });
  };

  dashboardPush = route => {
    if (window.innerWidth < 480) {
      this.props.setAccountSidebarState(0);
      this.props.setDashboardSidebarState(0);
      return history.push(route);
    }
    return history.push(route);
  };

  renderEventState = (canceled, published) => {
    if (canceled) return 'Canceled';
    if (published) return 'Published';
    return 'Created';
  };

  setEventData = (hostedEvents, eventId, resetForm, changeField) => {
    if (hostedEvents) {
      if (hostedEvents.length > 0) {
        const selectedEvent = hostedEvents.filter(e => Number(e.id) === Number(eventId));
        if (selectedEvent.length > 0) {
          this.props.setEventId(selectedEvent[0].id);
          this.props.setEventSlug(selectedEvent[0].name_slug, selectedEvent[0].published);

          // Why is this here?
          // SOURCE: https://github.com/facebook/react/issues/9654#issuecomment-300659423
          const setState = this.setState.bind(this);

          setEventState(setState, selectedEvent, false, resetForm, changeField);

          return selectedEvent;
        }
      }
    }
  };

  renderOptions = (hostedEvents, eventId, status) => {
    let filteredEvents;
    let renderedDom;

    if (hostedEvents.length > 0) {
      hostedEvents.map(event => {
        if (status === 'created') {
          filteredEvents = hostedEvents.filter(e => {
            return !e.published && !e.canceled && !isEnded(e.endAt, e.timezone);
          });
          renderedDom = filteredEvents.map(filteredEvent => (
            <MenuItem
              key={filteredEvent.id}
              selected={Number(filteredEvent.id) === Number(eventId)}
              value={event.id}
              onClick={this.handleChange(filteredEvent)}
            >
              {filteredEvent.name}
            </MenuItem>
          ));
        }
        if (status === 'published') {
          filteredEvents = hostedEvents.filter(
            e => e.published && !e.canceled && !isEnded(e.endsAt, e.timezone),
          );
          renderedDom = filteredEvents.map(filteredEvent => {
            return (
              <MenuItem
                key={filteredEvent.id}
                selected={Number(filteredEvent.id) === Number(eventId)}
                value={filteredEvent.id}
                onClick={this.handleChange(filteredEvent)}
              >
                {filteredEvent.name}
              </MenuItem>
            );
          });
        }
        if (status === 'past') {
          filteredEvents = hostedEvents.filter(
            e => isEnded(e.endsAt, e.timezone) || e.canceled,
          );
          renderedDom = filteredEvents.map(filteredEvent => (
            <MenuItem
              key={filteredEvent.id}
              selected={Number(filteredEvent.id) === Number(eventId)}
              value={event.id}
              onClick={this.handleChange(filteredEvent)}
            >
              {filteredEvent.name}
            </MenuItem>
          ));
        }
      });
    }

    return renderedDom;
  };
  handleView = () => {
    return history.push(`/event/${this.state.eventSlug}`);
  };
  renderDialog = () => {
    let title, description, handleConfirm, handleSecondary, secondaryLabel, warning;

    switch (this.state.confirmationDialogSubject) {
      case 'publish':
        title = 'Event Published';
        description = 'Congratulations! Your event has been published.';
        warning = null;
        handleSecondary = this.handleView;
        secondaryLabel = 'View';
        handleConfirm = this.handleConfirmDismiss;
        break;
      default:
        title = 'Cancel event';
        description = (
          <DialogContentText>
            To cancel an event please send us an email at{' '}
            <a
              style={{ color: '#00aeef' }}
              href="mailto:contact@eventhi.io?subject=EventHi - Cancel Event"
            >
              contact@eventhi.io
            </a>
          </DialogContentText>
        );
        warning = null;
        handleSecondary = null;
        secondaryLabel = null;
        handleConfirm = this.handleConfirmDismiss;
        break;
    }
    return (
      <ConfirmationDialog
        title={title}
        description={description}
        warning={warning}
        noCancel
        confirmLabel="Continue"
        secondaryButton={handleSecondary}
        secondaryButtonLabel={secondaryLabel}
        open={this.state.confirmationDialogOpen}
        handleCancel={this.handleConfirmDismiss}
        handleConfirm={handleConfirm}
        handleSecondary={handleSecondary}
      />
    );
  };
  generateSelectedEventTitle = (name, canceled) => {
    if (!name) return 'Select event';

    return `${name}`;
  };
  render() {
    const { eventName, eventCanceled, eventPublished, eventEnded } = this.state;
    const { classes, eventId } = this.props;
    const { hostedEvents } = this.state;

    const locationX = history.location ? history.location.pathname : null;
    console.log('xxxlocationx', locationX);

    return this.props.authenticated ? (
      <SidebarController
        eventSelectField={
          <div className={classes.menuRoot}>
            <List>
              <ListItem
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Please select an event"
                classes={{
                  gutters: classes.gutters,
                }}
                button
                onClick={this.handleClickListItem}
              >
                <ListItemIcon>
                  <Svg icon="EventCheckin" />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.primaryText,
                  }}
                  primary={this.generateSelectedEventTitle(eventName, eventCanceled)}
                  secondary={
                    this.props.eventId
                      ? this.renderEventState(eventCanceled, eventPublished)
                      : null
                  }
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
            >
              <List
                subheader={
                  <ListSubheader classes={{ root: classes.subheader }}>
                    Created
                  </ListSubheader>
                }
              />
              {this.renderOptions(
                hostedEvents,
                this.props.eventId ? this.props.eventId : 0,
                'created',
              )}
              <List subheader={<ListSubheader>Published</ListSubheader>} />
              {this.renderOptions(
                hostedEvents,
                this.props.eventId ? this.props.eventId : 0,
                'published',
              )}

              <List subheader={<ListSubheader>Past</ListSubheader>} />
              {this.renderOptions(
                hostedEvents,
                this.props.eventId ? this.props.eventId : 0,
                'past',
              )}

              {hostedEvents ? (
                hostedEvents.length === 0 ? (
                  <MenuItem
                    key="create"
                    selected={false}
                    value={'Create'}
                    onClick={() => this.props.handleCreateRedirect()}
                  >
                    Create an Event
                  </MenuItem>
                ) : null
              ) : null}
            </Menu>
          </div>
        }
        list={
          <List>
            <ListItem
              disabled={!eventName}
              button
              onClick={() => this.dashboardPush('/dashboard/analytics')}
              className={classNames(
                classes.listItemHover,
                locationX === '/dashboard/analytics' && classes.listItemActive,
              )}
            >
              <ListItemIcon>
                <SvgIcon viewBox="0 0 24 24">
                  <path d="M17.45,15.18L22,7.31V19L22,21H2V3H4V15.54L9.5,6L16,9.78L20.24,2.45L21.97,3.45L16.74,12.5L10.23,8.75L4.31,19H6.57L10.96,11.44L17.45,15.18Z" />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            {dashboardAttendees ? (
              <ListItem
                disabled={!eventName}
                button
                onClick={() => this.dashboardPush('/dashboard/attendees')}
                className={classNames(
                  classes.listItemHover,
                  locationX === '/dashboard/attendees' && classes.listItemActive,
                )}
              >
                <ListItemIcon>
                  <SvgIcon viewBox="0 0 24 24">
                    <path d="M13,8.5H11V6.5H13V8.5M13,13H11V11H13V13M13,17.5H11V15.5H13V17.5M22,10V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V10C3.11,10 4,10.9 4,12A2,2 0 0,1 2,14V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V14A2,2 0 0,1 20,12A2,2 0 0,1 22,10Z" />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Attendees" />
              </ListItem>
            ) : null}
            {dashboardSponsorships ? (
              <ListItem
                disabled={!eventName}
                button
                onClick={() => this.dashboardPush('/dashboard/sponsorships')}
                className={classNames(
                  classes.listItemHover,
                  locationX === '/dashboard/sponsorships' && classes.listItemActive,
                )}
              >
                <ListItemIcon>
                  <Svg icon="Store" />
                </ListItemIcon>
                <ListItemText primary="Sponsorships" />
              </ListItem>
            ) : null}
            {edit ? (
              <ListItem
                button
                disabled={!eventName}
                onClick={() => this.dashboardPush('/dashboard/edit')}
                className={classNames(
                  classes.listItemHover,
                  locationX === '/dashboard/edit' && classes.listItemActive,
                )}
              >
                <ListItemIcon>
                  <SvgIcon viewBox="0 0 24 24">
                    <path
                      d={`M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.08 20.21,11.08 20.42,11.3L21.7,12.58C21.92,12.79 21.92,13.14 21.7,13.35M12,18.94L18.07,12.88L20.12,14.93L14.06,21H12V18.94M4,2H18A2,2 0 0,1 20,4V8.17L16.17,12H12V16.17L10.17,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,6V10H10V6H4M12,6V10H18V6H12M4,12V16H10V12H4Z`}
                    />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </ListItem>
            ) : null}
            {billing ? (
              <ListItem
                button
                disabled={!eventName}
                onClick={() => this.dashboardPush('/dashboard/billing')}
                className={classNames(
                  classes.listItemHover,
                  locationX === '/dashboard/billing' && classes.listItemActive,
                )}
              >
                <ListItemIcon>
                  <SvgIcon viewBox="0 0 24 24">
                    <path
                      d={`M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.08 20.21,11.08 20.42,11.3L21.7,12.58C21.92,12.79 21.92,13.14 21.7,13.35M12,18.94L18.07,12.88L20.12,14.93L14.06,21H12V18.94M4,2H18A2,2 0 0,1 20,4V8.17L16.17,12H12V16.17L10.17,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,6V10H10V6H4M12,6V10H18V6H12M4,12V16H10V12H4Z`}
                    />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Billing" />
              </ListItem>
            ) : null}
            {refunds ? (
              <ListItem
                button
                disabled={eventEnded || !eventName || eventCanceled}
                onClick={() => this.dashboardPush('/dashboard/refunds')}
                className={classNames(
                  classes.listItemHover,
                  locationX === '/dashboard/refunds' && classes.listItemActive,
                )}
              >
                <ListItemIcon>
                  <SvgIcon viewBox="0 0 24 24">
                    <path
                      d={`M12.5,6.9C14.28,6.9 14.94,7.75 15,9H17.21C17.14,7.28 16.09,5.7 14,5.19V3H11V5.16C10.47,5.28 9.97,5.46 9.5,5.7L11,7.17C11.4,7 11.9,6.9 12.5,6.9M5.33,4.06L4.06,5.33L7.5,8.77C7.5,10.85 9.06,12 11.41,12.68L14.92,16.19C14.58,16.67 13.87,17.1 12.5,17.1C10.44,17.1 9.63,16.18 9.5,15H7.32C7.44,17.19 9.08,18.42 11,18.83V21H14V18.85C14.96,18.67 15.82,18.3 16.45,17.73L18.67,19.95L19.94,18.68L5.33,4.06Z`}
                    />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Refunds" />
              </ListItem>
            ) : null}
            {checkin ? (
              <ListItem
                disabled={eventEnded || !eventName || eventCanceled}
                button
                onClick={() => this.dashboardPush('/dashboard/checkin')}
                className={classNames(
                  classes.listItemHover,
                  locationX === '/dashboard/checkin' && classes.listItemActive,
                )}
              >
                <ListItemIcon>
                  <Svg icon="EventCheckin" />
                </ListItemIcon>
                <ListItemText primary="Checkin" />
              </ListItem>
            ) : null}
            {publishEvent ? (
              <ListItem
                button
                classes={{ root: this.props.classes.root }}
                disabled={eventEnded || !eventName || eventPublished || eventCanceled}
                onClick={() => this.handlePublishEvent(eventId)}
              >
                <ListItemIcon>
                  <Svg icon="Publish" />
                </ListItemIcon>
                <ListItemText primary="Publish Event" />
              </ListItem>
            ) : null}
            {cancelEvent ? (
              <ListItem
                disabled={eventEnded || !eventName || eventCanceled}
                button
                classes={{ root: this.props.classes.root }}
                onClick={() => this.handleCancelEventClick()}
              >
                <ListItemIcon>
                  <Svg icon="Cancel" />
                </ListItemIcon>
                <ListItemText primary="Cancel Event" />
              </ListItem>
            ) : null}
          </List>
        }
      >
        {this.props.children}
        {this.renderDialog()}
      </SidebarController>
    ) : (
      <div />
    );
  }
}

const mapStateToProps = state => ({
  eventId: state.event.dashboardEvent.eventId,
  authenticated: state.auth.authenticated,
  email: state.auth.email,
});

const mapDispatchToProps = dispatch => ({
  setAccountSidebarState: state => {
    dispatch(setAccountSidebarState(state));
  },
  setDashboardSidebarState: state => {
    dispatch(setDashboardSidebarState(state));
  },
  setEventId: state => {
    dispatch(setEventId(state));
  },
  setEventSlug: (slug, published) => {
    dispatch(setEventSlug(slug, published));
  },
  resetForm: form => {
    dispatch(destroy(form));
  },
  changeField: (form, field, value) => {
    dispatch(change(form, field, value));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  graphql(cancelEventMutation, { name: 'cancelEventMutation' }),
  graphql(publishEventMutation, { name: 'publishEventMutation' }),
  withApollo,
  withStyles(styles),
)(Dashboard);
