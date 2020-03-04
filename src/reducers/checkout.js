import { SET_CHECKOUT_DATA } from 'actions/checkoutData';

const initialState = {
  eventData: {},
  selectedItems: {},
  mode: 'ticket',
};

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHECKOUT_DATA:
      return {
        ...state,
        eventData: action.data.eventData,
        selectedItems: action.data.selectedItems,
        mode: action.data.mode,
      };
    default:
      return state;
  }
}
