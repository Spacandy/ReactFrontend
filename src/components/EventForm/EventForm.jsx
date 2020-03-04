//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import moment from 'moment-timezone';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { detailedDiff } from 'deep-object-diff';
import { setEventFormStep } from 'actions/eventForm/eventFormStep';
import {
  generalFields,
  baseLocationFields,
  physicalLocationFields,
  onlineLocationFields,
  mediaFields,
  ticketsFields,
  promoteFields,
  refundsFields,
} from 'fields';

import {
  GeneralStep,
  ScheduleStep,
  LocationStep,
  MediaStep,
  TicketStep,
  PromoteStep,
  RefundsStep,
} from './steps';

import eventFormChoicesQuery from './eventFormChoices.graphql';
import uploadPhotoMutation from './uploadPhotoMutation.graphql';
import { scheduleFields } from '../../fields';

type Props = {
  setEventFormStep: Function,
  currentStep: number,
  handleFinish: Function,
};
type State = {};

const styles = () => ({
  root: {
    maxWidth: 600,
    margin: '40px auto',
  },
});

class EventForm extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps) {
    return { parsedErrors: nextProps.errors };
  }
  state: State = {
    parsedErrors: {},
  };
  props: Props;

  handleStep = direction => {
    if (direction === 'back') this.props.setEventFormStep(this.props.currentStep - 1);
    if (direction === 'forward') this.props.setEventFormStep(this.props.currentStep + 1);
  };
  processObj = (val, initialValues = false) => {
    const getFieldsData = (obj, fields) =>
      fields.reduce((memo, f) => {
        memo[f] = obj[f];
        return memo;
      }, {});
    console.log('val in processObj', val);
    // General section data
    const generalValues = {
      ...getFieldsData(val.generalFormValues, generalFields),
      organizerContentType: this.props.contentTypeId,
      organizerObjectId: this.props.organizerId,
    };

    // Schedule section data
    let scheduleValues = getFieldsData(val.scheduleFormValues, scheduleFields);
    if (initialValues) {
      const offset = moment(val.scheduleFormValues.startDate)
        .tz(scheduleValues.timezone)
        .format('Z');
      const startMoment = moment(
        `${val.scheduleFormValues.startDate}T${
          val.scheduleFormValues.startTime
        }${offset}`,
      );
      const endMoment = moment(
        `${val.scheduleFormValues.endDate}T${val.scheduleFormValues.endTime}${offset}`,
      );
      scheduleValues.startDate = startMoment.tz('UTC').format('YYYY-MM-DD');
      scheduleValues.startTime = startMoment.tz('UTC').format('HH:mm:ss');
      scheduleValues.endDate = endMoment.tz('UTC').format('YYYY-MM-DD');
      scheduleValues.endTime = endMoment.tz('UTC').format('HH:mm:ss');
    }

    let locationValues = getFieldsData(val.locationFormValues, baseLocationFields);

    if (locationValues.locationType)
      locationValues.locationType = locationValues.locationType.toLowerCase();
    if (!locationValues.locationType) locationValues.locationType = 'physical';
    if (locationValues.locationType === 'physical')
      locationValues = {
        ...locationValues,
        ...{
          physicalLocation: {
            ...getFieldsData(val.locationFormValues, physicalLocationFields),
            addressCountry: 'United States',
          },
        },
      };
    else if (locationValues.locationType === 'online')
      locationValues = {
        ...locationValues,
        ...{
          onlineLocation: getFieldsData(val.locationFormValues, onlineLocationFields),
        },
      };

    // Media section data
    const mediaValues = getFieldsData(val.mediaFormValues, mediaFields);

    // Tickets section data
    const ticketFormsValues = val.ticketFormValues.tickets;
    const ticketValuesList = ticketFormsValues
      ? ticketFormsValues.map(ticketValues =>
          getFieldsData(ticketValues, ['id', ...ticketsFields]),
        )
      : null;

    // Promote section data
    const promoteValues = getFieldsData(val.promoteFormValues, promoteFields);
    // promoteValues.organizerWebsite = promoteValues.organizerWebsite
    //   ? promoteValues.organizerWebsite
    //   : undefined;
    // promoteValues.organizerFacebook = promoteValues.organizerFacebook
    //   ? `https://www.facebook.com/${promoteValues.organizerFacebook}`
    //   : undefined;
    // promoteValues.organizerInstagram = promoteValues.organizerInstagram
    //   ? `https://www.instagram.com/${promoteValues.organizerInstagram}`
    //   : undefined;
    // promoteValues.organizerTwitter = promoteValues.organizerTwitter
    //   ? `https://twitter.com/${promoteValues.organizerTwitter}`
    //   : undefined;

    // Refunds section data
    const refundsValues = getFieldsData(val.refundsFormValues, refundsFields);

    return {
      ...generalValues,
      ...scheduleValues,
      ...{ location: locationValues },
      ...mediaValues,
      ...{ tickets: ticketValuesList },
      ...promoteValues,
      ...refundsValues,
    };
  };
  compareObjs = (props, processObj) => {
    const {
      generalFormValues,
      locationFormValues,
      scheduleFormValues,
      mediaFormValues,
      ticketFormValues,
      promoteFormValues,
      refundsFormValues,
      initialValues,
    } = props;

    const responseObj = processObj(
      {
        generalFormValues,
        locationFormValues,
        scheduleFormValues,
        mediaFormValues,
        ticketFormValues,
        promoteFormValues,
        refundsFormValues,
      },
      initialValues,
    );
    let responseObj2;
    if (initialValues) {
      console.log(
        'detailedDiff  ticketFormValues',
        ticketFormValues,
        initialValues.tickets,
      );
      responseObj2 = processObj({
        generalFormValues: initialValues.general,
        locationFormValues: initialValues.where,
        scheduleFormValues: initialValues.when,
        mediaFormValues: initialValues.media,
        ticketFormValues: { tickets: initialValues.tickets },
        promoteFormValues: initialValues.promote,
        refundsFormValues: initialValues.refunds,
      });
    }
    return { responseObj, responseObj2 };
  };

  handleSubmit = () => {
    const { responseObj, responseObj2 } = this.compareObjs(this.props, this.processObj);
    if (this.props.handleConfirmOpen) return this.props.handleConfirmOpen();
    this.props.handleFinish(responseObj, responseObj2).then(eventId => {
      if (this.props.initialValues) {
        console.log('detailedDiff detailedDiff', detailedDiff(responseObj2, responseObj));
      }

      if (eventId && this.props.mediaFormValues.imageData)
        return this.props.uploadPhotoMutation({
          variables: {
            eventId,
            imageData: this.props.mediaFormValues.imageData,
          },
        });
    });
  };

  renderActions = step => {
    if (step === 0)
      return [
        <Button dense key="0" onClick={() => this.handleStep('forward')} color="primary">
          Next
        </Button>,
        this.props.finishLabel === 'Save' ? (
          <Button dense key="1" onClick={this.handleSubmit} color="primary">
            {this.props.finishLabel}
          </Button>
        ) : null,
      ];
    if (step === 6)
      return [
        <Button dense key="0" onClick={() => this.handleStep('back')} color="inherit">
          Back
        </Button>,
        <Button dense key="1" onClick={this.handleSubmit} color="primary">
          {this.props.finishLabel}
        </Button>,
      ];
    return [
      <Button dense key="0" onClick={() => this.handleStep('back')} color="inherit">
        Back
      </Button>,
      <Button dense key="1" onClick={() => this.handleStep('forward')} color="primary">
        Next
      </Button>,
      this.props.finishLabel === 'Save' ? (
        <Button dense key="2" onClick={this.handleSubmit} color="primary">
          {this.props.finishLabel}
        </Button>
      ) : null,
    ];
  };
  render() {
    const { classes, initialValues, errors, sectionErrors } = this.props;
    const { parsedErrors } = this.state;

    let initialGeneralValues = initialValues ? initialValues.general : null;
    let initialScheduleValues = initialValues ? initialValues.when : null;
    let initialLocationValues = initialValues ? initialValues.where : null;
    let initialPromoteValues = initialValues ? initialValues.promote : null;
    let initialRefundsValues = initialValues ? initialValues.refunds : null;
    let initialMediaValues = initialValues ? initialValues.media : null;
    let initialTicketValues = initialValues ? initialValues.tickets : null;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={this.props.currentStep === 0}
          onChange={() => this.props.setEventFormStep(0)}
        >
          <ExpansionPanelSummary>
            {sectionErrors.generalError ? (
              <Typography style={{ color: 'red' }}>General</Typography>
            ) : (
              <Typography>General</Typography>
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <GeneralStep
              form={`generalForm${this.props.formSuffix}`}
              enableReinitialize
              keepDirtyOnReinitialize
              shouldReset={false}
              initialValues={initialGeneralValues}
              choices={this.props.data.eventFormChoices || ''}
              errors={parsedErrors ? parsedErrors.general : null}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>{this.renderActions(0)}</ExpansionPanelActions>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={this.props.currentStep === 1}
          onChange={() => this.props.setEventFormStep(1)}
        >
          <ExpansionPanelSummary>
            {sectionErrors.whereError ? (
              <Typography style={{ color: 'red' }}>Where</Typography>
            ) : (
              <Typography>Where</Typography>
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <LocationStep
              form={`locationForm${this.props.formSuffix}`}
              generalForm={`generalForm${this.props.formSuffix}`}
              enableReinitialize
              keepDirtyOnReinitialize
              initialValues={initialLocationValues}
              errors={parsedErrors ? parsedErrors.where : null}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>{this.renderActions(1)}</ExpansionPanelActions>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={this.props.currentStep === 2}
          onChange={() => this.props.setEventFormStep(2)}
        >
          <ExpansionPanelSummary>
            {sectionErrors.whenError ? (
              <Typography style={{ color: 'red' }}>When</Typography>
            ) : (
              <Typography>When</Typography>
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ScheduleStep
              form={`scheduleForm${this.props.formSuffix}`}
              generalForm={`generalForm${this.props.formSuffix}`}
              locationForm={`locationForm${this.props.formSuffix}`}
              enableReinitialize
              keepDirtyOnReinitialize
              initialValues={initialScheduleValues}
              initialDateSelected={initialScheduleValues !== {} ? true : false}
              errors={parsedErrors ? parsedErrors.when : null}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>{this.renderActions(2)}</ExpansionPanelActions>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={this.props.currentStep === 3}
          onChange={() => this.props.setEventFormStep(3)}
        >
          <ExpansionPanelSummary>
            <Typography>Media</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <MediaStep
              form={`mediaForm${this.props.formSuffix}`}
              enableReinitialize
              keepDirtyOnReinitialize
              initialValues={initialMediaValues}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>{this.renderActions(3)}</ExpansionPanelActions>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={this.props.currentStep === 4}
          onChange={() => this.props.setEventFormStep(4)}
        >
          <ExpansionPanelSummary>
            {sectionErrors.ticketsError ? (
              <Typography style={{ color: 'red' }}>Tickets</Typography>
            ) : (
              <Typography>Tickets</Typography>
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TicketStep
              form={`ticketForm${this.props.formSuffix}`}
              scheduleForm={`scheduleForm${this.props.formSuffix}`}
              enableReinitialize
              keepDirtyOnReinitialize
              initialValue={initialTicketValues}
              errors={parsedErrors ? parsedErrors.tickets : null}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>{this.renderActions(4)}</ExpansionPanelActions>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={this.props.currentStep === 5}
          onChange={() => this.props.setEventFormStep(5)}
        >
          <ExpansionPanelSummary>
            {sectionErrors.promoteError ? (
              <Typography style={{ color: 'red' }}>Promote</Typography>
            ) : (
              <Typography>Promote</Typography>
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <PromoteStep
              form={`promoteForm${this.props.formSuffix}`}
              choices={this.props.data.eventFormChoices || []}
              enableReinitialize
              keepDirtyOnReinitialize
              initialValues={initialPromoteValues}
              errors={parsedErrors ? parsedErrors.promote : null}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>{this.renderActions(5)}</ExpansionPanelActions>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={this.props.currentStep === 6}
          onChange={() => this.props.setEventFormStep(6)}
        >
          <ExpansionPanelSummary>
            {sectionErrors.refundsError ? (
              <Typography style={{ color: 'red' }}>Refunds</Typography>
            ) : (
              <Typography>Refunds</Typography>
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RefundsStep
              form={`refundsForm${this.props.formSuffix}`}
              enableReinitialize
              keepDirtyOnReinitialize
              initialValues={initialRefundsValues}
              errors={parsedErrors ? parsedErrors.refunds : null}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>{this.renderActions(6)}</ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { form } = state;
  const getForm = name => form[`${name}${ownProps.formSuffix}`];
  return {
    generalFormValues: (getForm('generalForm') && getForm('generalForm').values) || {},
    scheduleFormValues: (getForm('scheduleForm') && getForm('scheduleForm').values) || {},
    locationFormValues: (getForm('locationForm') && getForm('locationForm').values) || {},
    mediaFormValues: (getForm('mediaForm') && getForm('mediaForm').values) || {},
    ticketFormValues: (getForm('ticketForm') && getForm('ticketForm').values) || {},
    promoteFormValues: (getForm('promoteForm') && getForm('promoteForm').values) || {},
    refundsFormValues: (getForm('refundsForm') && getForm('refundsForm').values) || {},
    locationValues: state.location,
    currentStep: state.eventForm.step.step || 0,
    sectionErrors: state.eventForm.errors.errors || {},
    contentTypeId: state.auth.contentTypeId,
    organizerId: state.auth.id,
  };
};

const mapDispatchToProps = dispatch => ({
  setEventFormStep: step => {
    dispatch(setEventFormStep(step));
  },
});

export default compose(
  withStyles(styles),
  graphql(eventFormChoicesQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
  graphql(uploadPhotoMutation, { name: 'uploadPhotoMutation' }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EventForm);
