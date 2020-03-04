export const SET_BILLING_REQUIRED_MODAL_STATE = 'SET_BILLING_REQUIRED_MODAL_STATE';

export function setBillingRequiredModalState(open, referredFromTicket = false) {
  return {
    type: SET_BILLING_REQUIRED_MODAL_STATE,
    data: {
      open,
      referredFromTicket,
    },
  };
}
