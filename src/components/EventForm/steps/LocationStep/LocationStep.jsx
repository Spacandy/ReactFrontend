//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, change } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Select as SelectField, Checkbox } from 'lib/redux-form-material-ui';

import { states, illegal } from 'states.js';
import {
  fetchLocationSuggestions,
  fetchLocationCooridantes,
  updateFullLocation,
} from 'actions/location';
import Typography from '@material-ui/core/Typography';

import errorArrayParser from 'helpers/errorArrayParser';
import fetchLocationGeocode from 'helpers/fetchers/fetchLocationGeocode';
import { validateRequired } from 'helpers/validation';

import type { Props, State } from './types';
import stylesGenerator from './styles';

const styles = () => {
  return stylesGenerator();
};

function constructAddressString(addressLocality, addressRegion) {
  if (addressLocality && !addressRegion) {
    return `${addressLocality}`;
  } else if (!addressLocality && addressRegion) {
    return `${addressRegion}`;
  } else if (addressLocality && addressRegion) {
    return `${addressLocality}, ${addressRegion}}`;
  }
  return ``;
}

function handleLocationFetch(newValue, addressLocality, addressRegion, c, f) {
  if (addressLocality || addressRegion) {
    return fetchLocationGeocode(
      constructAddressString(addressLocality, addressRegion),
      c,
      f,
    );
  }
}

class LocationStep extends Component<Props, State> {
  state: State;

  componentDidMount() {
    this.props.change('locationType', 'physical');
    if (this.props.initialValues) {
      this.props.setFullLocation(this.props.initialValues.fullLocation);
    }
  }

  props: Props;

  render() {
    const { initialValues, errors } = this.props;

    const streetAddressError = errors
      ? errors.hasOwnProperty('physical_location')
        ? errorArrayParser(errors.physical_location, 'street_address')
        : undefined
      : undefined;
    const addressLocalityError = errors
      ? errors.hasOwnProperty('physical_location')
        ? errorArrayParser(errors.physical_location, 'address_locality')
        : undefined
      : undefined;
    const addressRegionError = errors
      ? errors.hasOwnProperty('physical_location')
        ? errorArrayParser(errors.physical_location, 'address_region')
        : undefined
      : undefined;
    const postalCodeError = errors
      ? errors.hasOwnProperty('physical_location')
        ? errorArrayParser(errors.physical_location, 'postal_code')
        : undefined
      : undefined;

    return (
      <div style={{ width: '100%' }}>
        <div>
          <br />
          <br />
          <Field
            name="addressName"
            component={TextField}
            placeholder="Venue"
            label="Venue"
            fullWidth
          />
          <br />
          <br />
          <Field
            name="streetAddress"
            component={TextField}
            placeholder="Street Address"
            label="Street Address"
            fullWidth
            required
            validate={validateRequired}
            message={streetAddressError}
          />
          <br />
          <br />
          <Field
            name="addressLocality"
            component={TextField}
            placeholder="City"
            label="City"
            fullWidth
            required
            validate={validateRequired}
            message={addressLocalityError}
            onBlur={newValue =>
              handleLocationFetch(
                newValue,
                this.props.addressLocality,
                this.props.addressRegion,
                this.props.changeField,
                this.props.form,
              )
            }
          />
          <br />
          <br />
          <Field
            name="addressRegion"
            component={SelectField}
            placeholder="addressRegion"
            label="State"
            required
            message={addressRegionError}
            validate={validateRequired}
            onBlur={newValue =>
              handleLocationFetch(
                newValue,
                this.props.addressLocality,
                this.props.addressRegion,
                this.props.changeField,
                this.props.form,
              )
            }
          >
            {states.map(s => (
              <MenuItem selected={s === this.props.addressRegion} key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Field>
          <br />
          {this.props.cannabisConsumption &&
          illegal.includes(this.props.addressRegion) ? (
            <Typography>
              <b>WARNING</b>
              : State laws for your location do not allow for a consumtion event. Please
              either make your event non-consumption or change the location to a legal
              jurisdiction.
            </Typography>
          ) : null}

          <br />
          <br />
          <Field
            name="postalCode"
            component={TextField}
            placeholder="Zip Code"
            label="Zip Code"
            fullWidth
            required
            validate={validateRequired}
            message={postalCodeError}
          />
        </div>

        <div>
          <br />
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Field name="privateLocation" color="primary" component={Checkbox} />
                }
                label="Hide Event Location"
              />
            </FormGroup>
          </FormControl>
          {this.props.privateLocation
            ? [<Typography key="0">Only city will be shown on event page.</Typography>]
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const locationSelector = formValueSelector(ownProps.form);
  const generalSelector = formValueSelector(ownProps.generalForm);
  return {
    streetAddress: locationSelector(state, 'streetAddress'),
    addressLocality: locationSelector(state, 'addressLocality'),
    addressRegion: locationSelector(state, 'addressRegion'),
    locationType: locationSelector(state, 'locationType' || 'physical'),
    privateLocation: locationSelector(state, 'privateLocation'),
    lat: locationSelector(state, 'lat'),
    lng: locationSelector(state, 'lng'),
    cannabisConsumption: generalSelector(state, 'cannabisConsumption'),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFullLocation: value => dispatch(updateFullLocation(value)),
  changeField: (form, field, value) => {
    dispatch(change(form, field, value));
  },
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ destroyOnUnmount: false }),
)(LocationStep);
