// @flow
/** @module helpers/transaction/calculators */
import calculateCCFees from './calculateCCFees';
import calculateTicketServiceFees from './calculateTicketServiceFees';
import roundPrice from './roundPrice';
/**
 * Add two values.
 * @function calculateTicketFees
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

export default (price: number, feesType: 'pass' | 'absorb' = 'pass') => {
  const priceAsNumber = Number(price);

  // use raw price for these checks
  if (typeof price === 'object' || typeof price === 'undefined')
    throw new Error('helpers/transaction/calculateTicketFees: Price is not valid');

  // convert to number first in order to use Number.isNaN correctly
  if (Number.isNaN(priceAsNumber))
    throw new Error('helpers/transaction/calculateTicketFees: Price is NaN');

  // If item is free there is no fee
  if (priceAsNumber === 0) return 0;

  if (priceAsNumber) {
    if (String(feesType).toLowerCase() === 'pass') {
      return roundPrice(
        calculateTicketServiceFees(priceAsNumber) +
          calculateCCFees(priceAsNumber + calculateTicketServiceFees(priceAsNumber)),
      );
    }

    // if feesType is aborb return 0
    return roundPrice(0);
  }
};
