import React from 'react';
import Select from '@material-ui/core/Select';
import createComponent from './createComponent';
import mapError from './mapError';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

var S = createComponent(
  Select,
  ({
    input: { onChange, value, onBlur, ...inputProps },
    onChange: onChangeFromField,
    defaultValue,
    ...props
  }) => ({
    ...mapError(props),
    ...inputProps,
    value: value,
    onChange: event => {
      onChange(event.target.value);
      if (onChangeFromField) {
        onChangeFromField(event.target.value);
      }
    },
    onBlur: () => onBlur(value),
  }),
);

export default ({ meta: { touched, error, pristine }, ...others }) => {
  return (
    <FormControl error={pristine && (!!others.message || (touched && !!error))} fullWidth>
      <InputLabel
        error={pristine && (!!others.message || (touched && !!error))}
        htmlFor="age-helper"
        required={others.required}
      >
        {others.label}
      </InputLabel>
      <S
        error={(pristine && (!!others.message || (touched && !!error))) || others.error}
        {...others}
        fullWidth
        id="form-selector"
      />
      {pristine &&
        (others.message || (touched && error)) && (
          <FormHelperText htmlFor="form-selector">
            {others.message || error}
          </FormHelperText>
        )}
    </FormControl>
  );
};
