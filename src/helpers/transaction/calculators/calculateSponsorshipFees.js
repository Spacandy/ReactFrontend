// @flow
/** @module helpers/transaction/calculators */
import roundPrice from './roundPrice';
/**
 * Add two values.
 * @function calculateSponsorshipFees
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

export default (price: number, feesType: 'pass' | 'absorb' = 'pass') => {
  // Don't use global variables. Explicitly corece to number.
  // Source: https://stackoverflow.com/questions/46677774/eslint-unexpected-use-of-isnan/46677794#46677794
  const priceAsNumber = Number(price);

  if (typeof price === 'object' || typeof price === 'undefined')
    throw new Error('helpers/transaction/calculateSponsorshipFees: Price is not valid');

  if (priceAsNumber !== null || priceAsNumber !== undefined) {
    if (!feesType)
      throw new Error(
        'helpers/transaction/calculateSponsorshipFees: feesType is not valid',
      );
    if (price === 0) return 0;
    if (feesType === 'absorb') return roundPrice(0);
    if (feesType === 'pass') {
      return roundPrice(priceAsNumber * 0.059 + 0.99);
    }
  }

  throw new Error('helpers/transaction/calculateSponsorshipFees: Price is not valid');
};
