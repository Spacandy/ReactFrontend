const mapError = ({
  meta,
  meta: { touched, error, warning, initial, active, invalid } = {},
  input,
  ...props
}) => {
  if (!!initial) {
    if (touched && error === undefined) {
      return { ...input, ...props };
    }
    if (props.message) {
      return {
        ...props,
        ...input,
        error: Boolean(props.message && !active),
        parsedMessage: props.message && !active ? props.message : undefined,
        helperText: props.message && !active ? props.message : undefined,
      };
    } else if (error && touched) {
      return {
        ...props,
        ...input,
        error: Boolean(error || warning || props.error),
        parsedMessage: error || warning ? props.message : undefined,
        helperText: error || warning,
      };
    }
    return { ...input, ...props };
  }
  if (touched && error === undefined) {
    return { ...input, ...props };
  }
  if (props.message) {
    return {
      ...props,
      ...input,
      error: Boolean(props.message && !active),
      parsedMessage: props.message && !active ? props.message : undefined,
      helperText: props.message && !active ? props.message : undefined,
    };
  } else if (error && touched) {
    return {
      ...props,
      ...input,
      error: Boolean(error || warning || props.error),
      parsedMessage: error || warning ? props.message : undefined,
      helperText: error || warning,
    };
  }
  return { ...input, ...props };
};

export default mapError;
