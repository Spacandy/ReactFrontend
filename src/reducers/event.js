import { SET_EVENT_ID, SET_EVENT_SLUG } from 'actions/event';

const initialState = {
  dashboardEvent: {
    eventId: 0,
  },
  dashboardEventSlug: {
    eventSlug: '',
    published: false,
  },
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENT_ID:
      return {
        ...state,
        dashboardEvent: action.data,
      };
    case SET_EVENT_SLUG:
      return {
        ...state,
        dashboardEventSlug: action.data,
      };
    default:
      return state;
  }
}
