export const SET_EVENT_FORM_TICKET = 'SET_EVENT_FORM_TICKET';

export function setEventFormTicket(ticket) {
  return {
    type: SET_EVENT_FORM_TICKET,
    data: {
      ticket,
    },
  };
}
