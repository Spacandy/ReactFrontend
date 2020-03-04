import { SET_DASHBOARD_SIDEBAR_STATE } from 'actions/sidebars/dashboardSidebar';
import { SET_ACCOUNT_SIDEBAR_STATE } from 'actions/sidebars/accountSidebar';

const initialState = {
  dashboardSidebar: {
    state: 2,
    direction: 'left',
  },
  accountSidebar: {
    state: 2,
    direction: 'left',
  },
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_SIDEBAR_STATE:
      return {
        ...state,
        dashboardSidebar: action.data,
      };
    case SET_ACCOUNT_SIDEBAR_STATE:
      return {
        ...state,
        accountSidebar: action.data,
      };
    default:
      return state;
  }
}
