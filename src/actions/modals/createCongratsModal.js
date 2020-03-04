export const SET_CREATE_CONGRATS_MODAL_STATE = 'SET_CREATE_CONGRATS_MODAL_STATE';

export function setCreateCongratsModalState(open) {
  return {
    type: SET_CREATE_CONGRATS_MODAL_STATE,
    data: {
      open: open,
    },
  };
}
