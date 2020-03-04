export const SET_CHECKOUT_DATA = 'SET_CHECKOUT_DATA';

export function setCheckoutData(eventData, selectedItems, mode) {
  return {
    type: SET_CHECKOUT_DATA,
    data: {
      eventData,
      selectedItems,
      mode,
    },
  };
}
