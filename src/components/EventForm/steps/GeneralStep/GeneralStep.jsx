//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { TextField, Switch, Checkbox } from 'lib/redux-form-material-ui';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Editor from 'components/Editor';

import { validateRequired, validateEmailFormat } from 'helpers/validation';
import errorArrayParser from 'helpers/errorArrayParser';

type Props = {
  change: Function,
  choices: {
    organizerChoices: [string],
  },
  cannabisConsumption: boolean,
};

type State = {
  selectedCategories: [string],
};

class GeneralStep extends Component<Props, State> {
  state: State;

  UNSAFE_componentWillMount() {
    // This is here as a sub in for a organizer select field. We are selecting the first possible option.
    if (!this.props.initialValues) {
      this.props.change('isPublic', true);
      this.props.change('allowSharing', true);
      this.props.change('cannabisConsumption', false);
    }
  }

  props: Props;

  render() {
    const { errors } = this.props;

    const titleError = errorArrayParser(errors, 'title');
    const hostnameError = errorArrayParser(errors, 'hostname');
    const contactEmailError = errorArrayParser(errors, 'contactEmail');

    return (
      <div style={{ width: '100%' }}>
        <Field
          name="eventTitle"
          component={TextField}
          required
          fullWidth
          label="Event Title"
          message={titleError}
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="hostname"
          component={TextField}
          required
          fullWidth
          placeholder="Host Name"
          label="Host Name"
          message={hostnameError}
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="contactEmail"
          component={TextField}
          required
          fullWidth
          label="Contact Email"
          message={contactEmailError}
          validate={[validateRequired, validateEmailFormat]}
        />
        <br />
        <br />
        <br />
        <FormControl>
          <FormLabel style={{ marginBottom: 5 }}>Event Description</FormLabel>
          <Field name="description" component={Editor} fullWidth multiline rows={5} />
        </FormControl>

        <br />
        <br />
        <FormControlLabel
          control={
            <Field name="cannabisConsumption" color="primary" component={Switch} />
          }
          label={`${
            this.props.cannabisConsumption
              ? 'Cannabis Consumption'
              : 'No Cannabis Consumption'
          }`}
        />
        <br />
        <FormControlLabel
          control={<Field name="isPublic" color="primary" component={Switch} />}
          label={`${this.props.isPublic ? 'Public' : 'Private'} Event`}
        />
        <br />
        {!this.props.isPublic ? (
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Field name="allowSharing" color="primary" component={Checkbox} />
                }
                label="Allow users to share event"
              />
            </FormGroup>
          </FormControl>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector(ownProps.form);
  return {
    cannabisConsumption: selector(state, 'cannabisConsumption'),
    isPublic: selector(state, 'isPublic'),
    eventId: state.event.dashboardEvent ? state.event.dashboardEvent.eventId : 0,
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
  }),
)(GeneralStep);
