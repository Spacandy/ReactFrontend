export const SET_DASHBOARD_SIDEBAR_STATE = 'SET_DASHBOARD_SIDEBAR_STATE';

export function setDashboardSidebarState(state, direction = 'left') {
  return {
    type: SET_DASHBOARD_SIDEBAR_STATE,
    data: {
      state: state,
      direction: direction,
    },
  };
}
