export const SET_ACCOUNT_SIDEBAR_STATE = 'SET_ACCOUNT_SIDEBAR_STATE';

export function setAccountSidebarState(state, direction = 'left') {
  return {
    type: SET_ACCOUNT_SIDEBAR_STATE,
    data: {
      state: state,
      direction: direction,
    },
  };
}
