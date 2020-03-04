// @flow
/** @module helpers/transaction/calculators */

import roundPrice from './roundPrice';

/**
 * Add two values.
 * @function calculateCCFees
 * @description This function takes in a price and returns the total credit card fees to charge. As of the date of writing this the fee is 3%.
 * @summary Calculates the credit card fees on a transaction.
 * @param {(number|float)} price
 * @example
 * // returns 0.15
 * calculateCCFees(5);
 * @example
 * // returns 0.60
 * calculateCCFees(20);
 * @returns {number} The total computed price of the CC Fee
 */

export default (price: number) => {
  // Don't use global variables. Explicitly corece to number.
  // Source: https://stackoverflow.com/questions/46677774/eslint-unexpected-use-of-isnan/46677794#46677794
  const priceAsNumber = Number(price);

  if (typeof price === 'object' || typeof price === 'undefined')
    throw new Error('helpers/transaction/calculateCCFees: Price is not valid');

  if (priceAsNumber) {
    return roundPrice(priceAsNumber * 0.03);
  }
};
