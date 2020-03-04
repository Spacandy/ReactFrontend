export const SET_EVENT_FORM_ERRORS = 'SET_EVENT_FORM_ERRORS';

export function setEventFormErrors(errors) {
  return {
    type: SET_EVENT_FORM_ERRORS,
    data: {
      errors,
    },
  };
}
