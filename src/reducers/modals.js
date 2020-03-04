import { SET_PURCHASE_TICKET_MODAL_STATE } from 'actions/modals/purchaseTicketsModal';
import { SET_PURCHASE_CONGRATS_MODAL_STATE } from 'actions/modals/purchaseCongratsModal';
import { SET_CREATE_CONGRATS_MODAL_STATE } from 'actions/modals/createCongratsModal';
import { SET_BILLING_REQUIRED_MODAL_STATE } from 'actions/modals/billingRequiredModal';
import { SET_TICKET_TYPE_DELETE_CONFIRMATION_MODAL_STATE } from 'actions/modals/ticketTypeDeleteConfirmationModal';
import { SET_TICKET_TYPE_SUSPEND_CONFIRMATION_MODAL_STATE } from 'actions/modals/ticketTypeSuspendConfirmationModal';

const initialState = {
  purchaseTicketsModal: {
    open: false,
    eventId: null,
    availableTickets: [],
    timezone: '',
  },
  purchaseCongratsModal: {
    open: false,
  },
  createCongratsModal: {
    open: false,
  },
  billingRequiredModal: {
    open: false,
    referredFromTicket: false,
  },
  ticketTypeDeleteConfirmationModal: {
    open: false,
    ticketId: 0,
  },
  ticketTypeSuspendConfirmationModal: {
    open: false,
    ticketId: 0,
  },
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PURCHASE_TICKET_MODAL_STATE:
      return {
        ...state,
        purchaseTicketsModal: action.data,
      };
    case SET_PURCHASE_CONGRATS_MODAL_STATE:
      return {
        ...state,
        purchaseCongratsModal: action.data,
      };
    case SET_CREATE_CONGRATS_MODAL_STATE:
      return {
        ...state,
        createCongratsModal: action.data,
      };
    case SET_BILLING_REQUIRED_MODAL_STATE:
      return {
        ...state,
        billingRequiredModal: action.data,
      };
    case SET_TICKET_TYPE_DELETE_CONFIRMATION_MODAL_STATE:
      return {
        ...state,
        ticketTypeDeleteConfirmationModal: action.data,
      };
    case SET_TICKET_TYPE_SUSPEND_CONFIRMATION_MODAL_STATE:
      return {
        ...state,
        ticketTypeSuspendConfirmationModal: action.data,
      };
    default:
      return state;
  }
}
