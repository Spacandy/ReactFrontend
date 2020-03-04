// @flow
/** @module helpers/transaction/calculators */

/**
 * Add two values.
 * @function calculateTotalQuantity
 * @description This function has two calculation methods. If itemtype === 'ticket' it uses xxx, if itemType === 'sponsorship' it uses xxx.
 * @summary Calculates the line item total for the checkout page.
 * @param {(number|float)} price
 * @example
 * // returns 6.32
 * calculateItemSubtotal(5, 1, 'ticket');
 * @example
 * // returns 1059.99
 * calculateItemSubtotal(1000, 1, 'sponsorship');
 * @returns {number} the total computed price of the item type
 */

type TicketItem = {
  sponsorshipId: string | number,
  sponsorshipName: string,
  quantity: number | string,
  itemType: 'ticket' | 'sponsorship',
  price: number,
  fees: number,
  subtotal: number,
};

type SponsorshipItem = {
  sponsorshipId: string | number,
  sponsorshipName: string,
  quantity: number | string,
  itemType: 'ticket' | 'sponsorship',
  price: number,
  fees: number,
  subtotal: number,
};

export default (items: [TicketItem | SponsorshipItem]) => {
  if (items) {
    if (Array.isArray(items)) {
      if (items.length > 0) {
        return items.reduce((prev, cur) => prev + cur.quantity, 0);
      }
      return 0;
    }
    throw new Error('helpers/transaction/calculateTotalQuantity: Items is not an Array');
  }
  throw new Error('helpers/transaction/calculateTotalQuantity: No input');
};
