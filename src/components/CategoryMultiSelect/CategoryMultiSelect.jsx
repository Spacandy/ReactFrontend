//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { Field } from 'redux-form';

import { Select } from 'lib/redux-form-material-ui';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

import { validateCategoryRequired } from 'helpers/validation';
import errorArrayParser from 'helpers/errorArrayParser';

type Category = {
  id: string,
  name: string,
};

type Props = {
  categories: [Category],
  errors: {},
};

type State = {};

class CategoryMultiSelect extends Component<Props, State> {
  state: State;

  UNSAFE_componentWillMount = () => {
    if (this.props.initialValues) {
      return this.props.change('categories', this.props.initialValues.categories);
    } else {
      return this.props.change('categories', []);
    }
  };

  props: Props;

  normalize = (value, previousValue) => {
    // The limit is 3 categories per event
    // TODO: consider showing an error or tip when they attempt to add 4th event.

    if (value.length <= 3) {
      return value;
    }

    return previousValue;
  };

  menuItems = categories => {
    if (!categories) {
      categories = [];
    }
    return categories.map(({ name }) => (
      <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
    ));
  };

  render() {
    const { errors, categories } = this.props;

    const categoryError = errors
      ? errorArrayParser(errors, 'categories', true)
      : undefined;

    return (
      <FormControl fullWidth error={categoryError}>
        <InputLabel required htmlFor="driver">
          Categories
        </InputLabel>
        <Field
          name="categories"
          component={Select}
          normalize={this.normalize}
          validate={validateCategoryRequired}
          message={categoryError}
          error={categoryError}
          multiple
          renderValue={selected => (
            <div>{selected.map(value => <Chip key={value} label={value} />)}</div>
          )}
        >
          {this.menuItems(categories)}
        </Field>
        {categoryError ? (
          <FormHelperText htmlFor="render-select" error>
            {categoryError}
          </FormHelperText>
        ) : null}
      </FormControl>
    );
  }
}

export default CategoryMultiSelect;
