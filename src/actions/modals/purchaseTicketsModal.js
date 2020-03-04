export const SET_PURCHASE_TICKET_MODAL_STATE = 'SET_PURCHASE_TICKET_MODAL_STATE';

export function setPurchaseTicketModalState(
  open,
  eventId = null,
  tickets = [],
  timezone = '',
) {
  return {
    type: SET_PURCHASE_TICKET_MODAL_STATE,
    data: {
      open: open,
      eventId: eventId,
      availableTickets: tickets,
      timezone,
    },
  };
}
