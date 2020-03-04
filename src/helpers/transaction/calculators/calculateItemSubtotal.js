// @flow
/** @module helpers/transaction/calculators */

import calculateTicketFees from './calculateTicketFees';
import calculateSponsorshipFees from './calculateSponsorshipFees';
import roundPrice from './roundPrice';

/**
 * Add two values.
 * @function calculateItemSubtotal
 * @description This function has two calculation methods. If itemtype === 'ticket' it uses xxx, if itemType === 'sponsorship' it uses xxx.
 * @summary Calculates the line item total for the checkout page.
 * @param {(number|float)} price
 * @param {number} quantity
 * @param {('ticket'|'sponsorship')} itemType
 * @example
 * // returns 6.32
 * calculateItemSubtotal(5, 1, 'ticket');
 * @example
 * // returns 1059.99
 * calculateItemSubtotal(1000, 1, 'sponsorship');
 * @returns {number} The total computed price of the item type
 */

export default (
  price: number,
  quantity: number,
  itemType: 'ticket' | 'sponsorship',
  feesType: 'pass' | 'absorb' = 'pass',
) => {
  // If item is free there is no fee
  if (price === 0) return 0;

  if (typeof price === 'object' || typeof price === 'undefined')
    throw new Error('helpers/transaction/calculateItemSubtotal: Price is not valid');

  if (typeof quantity === 'object' || typeof quantity === 'undefined')
    throw new Error('helpers/transaction/calculateItemSubtotal: Quantity is not valid');

  if (itemType !== 'ticket' && itemType !== 'sponsorship')
    throw new Error(
      'helpers/transaction/calculateItemSubtotal: itemType is not valid is not valid',
    );

  const priceAsNumber = Number(price);

  if (itemType === 'ticket') {
    return roundPrice(
      roundPrice(priceAsNumber + calculateTicketFees(priceAsNumber, feesType)) * quantity,
    );
  }

  if (itemType === 'sponsorship')
    return roundPrice(
      roundPrice(priceAsNumber + calculateSponsorshipFees(priceAsNumber, feesType)) *
        quantity,
    );
};
