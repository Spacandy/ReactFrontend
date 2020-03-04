export const SET_EVENT_FORM_STEP = 'SET_EVENT_FORM_STEP';

export function setEventFormStep(step) {
  return {
    type: SET_EVENT_FORM_STEP,
    data: {
      step,
    },
  };
}
