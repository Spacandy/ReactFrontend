export const SET_PURCHASE_CONGRATS_MODAL_STATE = 'SET_PURCHASE_CONGRATS_MODAL_STATE';

export function setPurchaseCongratsModalState(open) {
  return {
    type: SET_PURCHASE_CONGRATS_MODAL_STATE,
    data: {
      open: open,
    },
  };
}
