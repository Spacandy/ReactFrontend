export const SET_TICKET_TYPE_DELETE_CONFIRMATION_MODAL_STATE =
  'SET_TICKET_TYPE_DELETE_CONFIRMATION_MODAL_STATE';

export function setTicketTypeDeleteConfirmationModalState(open, ticketId = 0) {
  return {
    type: SET_TICKET_TYPE_DELETE_CONFIRMATION_MODAL_STATE,
    data: {
      open: open,
      ticketId: ticketId,
    },
  };
}
