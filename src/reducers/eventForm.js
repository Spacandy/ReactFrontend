import { SET_EVENT_FORM_STEP } from 'actions/eventForm/eventFormStep';
import { SET_EVENT_FORM_TICKET } from 'actions/eventForm/eventFormTicket';
import { SET_EVENT_FORM_ERRORS } from 'actions/eventForm/eventFormErrors';

const initialState = {
  step: 0,
  ticket: 9,
  errors: {
    generalError: false,
    whereError: false,
    whenError: false,
    ticketsError: false,
    promoteError: false,
    refundsError: false,
  },
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENT_FORM_STEP:
      return {
        ...state,
        step: action.data,
      };
    case SET_EVENT_FORM_TICKET:
      return {
        ...state,
        ticket: action.data,
      };
    case SET_EVENT_FORM_ERRORS:
      return {
        ...state,
        errors: action.data,
      };
    default:
      return state;
  }
}
