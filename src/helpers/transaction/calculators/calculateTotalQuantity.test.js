import {
  mockDataOneTicketA,
  mockDataOneTicketB,
  mockDataOneTicketC,
  mockDataOneSponsorshipA,
  mockDataOneSponsorshipB,
  mockDataOneSponsorshipC,
  mockDataMultipleTicketsA,
  mockDataMultipleTicketsB,
  mockDataMultipleTicketsC,
  mockDataMultipleSponsorshipsA,
  mockDataMultipleSponsorshipsB,
  mockDataMultipleSponsorshipsC,
} from '../testData/mockData';
import {
  mockDataMissingTicketId,
  mockDataMissingTicketName,
  mockDataMissingSponsorshipId,
  mockDataMissingSponsorshipName,
  mockDataMissingQuantity,
  mockDataMissingItemType,
  mockDataMissingPrice,
  mockDataMissingFees,
  mockDataMissingSubtotal,
} from '../testData/missingMockData';

import { mockDataNotArray } from '../testData/incorrectMockData';
import calculateTotalQuantity from './calculateTotalQuantity';

describe('Transaction Total Quantity', () => {
  it('calculate one ticket correctly', () => {
    expect(calculateTotalQuantity(mockDataOneTicketA)).toBe(1);
    expect(calculateTotalQuantity(mockDataOneTicketB)).toBe(1);
    expect(calculateTotalQuantity(mockDataOneTicketC)).toBe(1);
  });
  it('calculate one sponsorship correctly', () => {
    expect(calculateTotalQuantity(mockDataOneSponsorshipA)).toBe(1);
    expect(calculateTotalQuantity(mockDataOneSponsorshipB)).toBe(1);
    expect(calculateTotalQuantity(mockDataOneSponsorshipC)).toBe(1);
  });
  it('calculate multiple ticket correctly', () => {
    expect(calculateTotalQuantity(mockDataMultipleTicketsA)).toBe(5);
    expect(calculateTotalQuantity(mockDataMultipleTicketsB)).toBe(7);
    expect(calculateTotalQuantity(mockDataMultipleTicketsC)).toBe(4);
  });
  it('calculate multiple sponsorship correctly', () => {
    expect(calculateTotalQuantity(mockDataMultipleSponsorshipsA)).toBe(2);
    expect(calculateTotalQuantity(mockDataMultipleSponsorshipsB)).toBe(3);
    expect(calculateTotalQuantity(mockDataMultipleSponsorshipsC)).toBe(2);
  });
  it('throw empty list is passed in', () => {
    expect(calculateTotalQuantity([])).toBe(0);
  });

  it('throw errors when there are no items', () => {
    expect(() => calculateTotalQuantity(null)).toThrow(
      'helpers/transaction/calculateTotalQuantity: No input',
    );
    expect(() => calculateTotalQuantity(undefined)).toThrow(
      'helpers/transaction/calculateTotalQuantity: No input',
    );
  });
  it('items are sent in type other than array', () => {
    expect(() => calculateTotalQuantity(mockDataNotArray)).toThrow(
      'helpers/transaction/calculateTotalQuantity: Items is not an Array',
    );
    expect(() => calculateTotalQuantity({})).toThrow(
      'helpers/transaction/calculateTotalQuantity: Items is not an Array',
    );
  });
});
