// @flow
import roundPrice from './roundPrice';

/** @module helpers/transaction/calculators */

/**
 * Add two values.
 * @function calculateTicketServiceFees
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

// Don't use global variables. Explicitly corece to number.
// Source: https://stackoverflow.com/questions/46677774/eslint-unexpected-use-of-isnan/46677794#46677794

export default (
  price: number,
  registrationFeeRate: number = 0.029,
  itemFee: number = 0.99,
) => {
  const priceAsNumber = Number(price);

  if (typeof price === 'object' || typeof price === 'undefined')
    throw new Error('helpers/transaction/calculateTicketServiceFees: Price is invalid');

  if (priceAsNumber) {
    const fee = priceAsNumber * registrationFeeRate + itemFee;

    // if (fee > 19.99) return 19.99;
    return roundPrice(fee);
  }
};
