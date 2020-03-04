//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|  V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { withStyles as MUIStyles } from '@material-ui/core/styles';
import moment from 'moment-timezone';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, change } from 'redux-form';

import Typography from '@material-ui/core/Typography';
import fnsFormat from 'date-fns/format';
import addHours from 'date-fns/add_hours';

import { TextField } from 'lib/redux-form-material-ui';

import { validateRequired } from 'helpers/validation';
import errorArrayParser from 'helpers/errorArrayParser';
import fetchTimezone from 'helpers/fetchers/fetchTimezone';

import type { Props, State } from './types';
import stylesGenerator from './styles';

const styles = () => {
  return stylesGenerator();
};

class ScheduleStep extends Component<Props, State> {
  state: State;
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.lat && nextProps.lng && nextProps.changeField && nextProps.form) {
      if (this.props.lat !== nextProps.lat || this.props.lng !== nextProps.lng)
        return fetchTimezone(
          nextProps.lat,
          nextProps.lng,
          nextProps.changeField,
          nextProps.form,
        );
    }
    return {};
  }
  componentDidMount = () => {
    const { initialValues, classes } = this.props;

    if (!initialValues) {
      const startDateValue = fnsFormat(addHours(new Date(), 2), 'YYYY-MM-DD');
      const endDateValue = fnsFormat(addHours(new Date(), 6), 'YYYY-MM-DD');
      const startTimeValue = fnsFormat(addHours(new Date(), 2), 'HH:mm');
      const endTimeValue = fnsFormat(addHours(new Date(), 6), 'HH:mm');

      this.props.change('startDate', startDateValue);
      this.props.change('endDate', endDateValue);
      this.props.change('startTime', startTimeValue);
      this.props.change('endTime', endTimeValue);
      this.props.change('timezone', moment.tz.guess());
    } else {
      const { timezone, startDate, startTime, endDate, endTime } = initialValues;
      const startMoment = moment(`${startDate}T${startTime}Z`);
      const endMoment = moment(`${endDate}T${endTime}Z`);

      this.props.change('startDate', startMoment.tz(timezone).format('YYYY-MM-DD'));
      this.props.change('endDate', endMoment.tz(timezone).format('YYYY-MM-DD'));
      this.props.change('startTime', startMoment.tz(timezone).format('HH:mm'));
      this.props.change('endTime', endMoment.tz(timezone).format('HH:mm'));
      this.props.change('timezone', timezone);
    }
  };

  props: Props;

  generateTimezoneAbbv = (timezone, timeZoneName) => {
    if (timezone || timeZoneName) {
      return moment.tz(timezone || timeZoneName).zoneAbbr();
    }
    return '';
  };
  render() {
    const { errors, classes } = this.props;

    const startDateError = errorArrayParser(errors, 'startDate');
    const endDateError = errorArrayParser(errors, 'endDate');
    const startTimeError = errorArrayParser(errors, 'startTime');
    const endTimeError = errorArrayParser(errors, 'endTime');

    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <Field
            name="startDate"
            label="Start Date"
            component={TextField}
            required
            fullWidth
            type="date"
            onBlur={event =>
              this.props.change('endDate', fnsFormat(this.props.startDate, 'YYYY-MM-DD'))
            }
            message={startDateError}
            validate={validateRequired}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Field
            name="startTime"
            label="Start Time"
            component={TextField}
            required
            fullWidth
            message={endDateError}
            validate={validateRequired}
            type="time"
            inputProps={{ step: '300' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <br />
        <br />
        <div style={{ display: 'flex' }}>
          <Field
            name="endDate"
            label="End Date"
            component={TextField}
            required
            fullWidth
            type="date"
            message={startTimeError}
            validate={validateRequired}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Field
            name="endTime"
            label="End Time"
            component={TextField}
            required
            fullWidth
            message={endTimeError}
            validate={validateRequired}
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Typography
          style={{
            textAlign: 'right',
            paddingTop: 5,
          }}
        >{`Timezone (${this.generateTimezoneAbbv(
          this.props.timezone,
          this.props.timeZoneName,
        )})`}</Typography>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector(ownProps.form);
  const locationSelector = formValueSelector(ownProps.locationForm);
  return {
    scheduleType: selector(state, 'scheduleType'),
    startDate: selector(state, 'startDate'),
    startTime: selector(state, 'startTime'),
    lat: locationSelector(state, 'lat'),
    lng: locationSelector(state, 'lng'),
    timezone: selector(state, 'timezone'),
    timeZoneName: selector(state, 'timeZoneName'),
  };
};

const mapDispatchToProps = dispatch => ({
  changeField: (form, field, value) => {
    dispatch(change(form, field, value));
  },
});

export default compose(
  MUIStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    destroyOnUnmount: false,
  }),
)(ScheduleStep);
