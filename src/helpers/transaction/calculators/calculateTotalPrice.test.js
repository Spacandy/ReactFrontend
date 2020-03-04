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
import calculateTotalPrice from './calculateTotalPrice';

describe('Transaction Total', () => {
  it('calculate one ticket correctly', () => {
    expect(calculateTotalPrice(mockDataOneTicketA)).toBeCloseTo(6.32);
    expect(calculateTotalPrice(mockDataOneTicketB)).toBeCloseTo(6.32);
    expect(calculateTotalPrice(mockDataOneTicketC)).toBeCloseTo(6.32);
  });
  it('calculate one sponsorship correctly', () => {
    expect(calculateTotalPrice(mockDataOneSponsorshipA)).toBeCloseTo(1059.99);
    expect(calculateTotalPrice(mockDataOneSponsorshipB)).toBeCloseTo(2118.99);
    expect(calculateTotalPrice(mockDataOneSponsorshipC)).toBeCloseTo(3707.49);
  });
  it('calculate multiple ticket correctly', () => {
    expect(calculateTotalPrice(mockDataMultipleTicketsA)).toBeCloseTo(27.36);
    expect(calculateTotalPrice(mockDataMultipleTicketsB)).toBeCloseTo(183.07);
    expect(calculateTotalPrice(mockDataMultipleTicketsC)).toBeCloseTo(22.1);
  });
  it('calculate multiple sponsorship correctly', () => {
    expect(calculateTotalPrice(mockDataMultipleSponsorshipsA)).toBeCloseTo(1166.88);
    expect(calculateTotalPrice(mockDataMultipleSponsorshipsB)).toBeCloseTo(1432.62);
    expect(calculateTotalPrice(mockDataMultipleSponsorshipsC)).toBeCloseTo(3814.38);
  });
  it('throw empty list is passed in', () => {
    expect(calculateTotalPrice([])).toBe(0);
  });

  it('throw errors when there are no items', () => {
    expect(() => calculateTotalPrice(null)).toThrow(
      'helpers/transaction/calculateTotalPrice: No input',
    );
    expect(() => calculateTotalPrice(undefined)).toThrow(
      'helpers/transaction/calculateTotalPrice: No input',
    );
  });
  it('items are sent in type other than array', () => {
    expect(() => calculateTotalPrice(mockDataNotArray)).toThrow(
      'helpers/transaction/calculateTotalPrice: Items is not an Array',
    );
    expect(() => calculateTotalPrice({})).toThrow(
      'helpers/transaction/calculateTotalPrice: Items is not an Array',
    );
  });
});
