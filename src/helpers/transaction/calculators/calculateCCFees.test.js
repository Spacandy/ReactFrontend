import calculateCCFees from './calculateCCFees';

describe('Credit Card Fees', () => {
  it('$5 ticket should have a 0.15 cc fee', () => {
    expect(calculateCCFees(5)).toBeCloseTo(0.15);
    expect(typeof calculateCCFees(5)).toBe('number');
  });
  it('$20 ticket should have a 0.60 cc fee', () => {
    expect(calculateCCFees(20)).toBeCloseTo(0.6);
    expect(typeof calculateCCFees(20)).toBe('number');
  });
  it('$200 ticket should have a 6.00 cc fee', () => {
    expect(calculateCCFees(200)).toBeCloseTo(6.0);
    expect(typeof calculateCCFees(200)).toBe('number');
  });
  it('$372.34 ticket should have a 11.17 cc fee', () => {
    expect(calculateCCFees(372.34)).toBeCloseTo(11.17);
    expect(typeof calculateCCFees(372.34)).toBe('number');
  });
  it('$1123.23 tickets should have a 33.70 cc fee', () => {
    expect(calculateCCFees(1123.23)).toBeCloseTo(33.7);
    expect(typeof calculateCCFees(1123.23)).toBe('number');
  });
  it('should throws errors when price is Object', () => {
    expect(() => calculateCCFees({})).toThrow(
      'helpers/transaction/calculateCCFees: Price is not valid',
    );
  });
  it('should throws errors when price is Array', () => {
    expect(() => calculateCCFees([])).toThrow(
      'helpers/transaction/calculateCCFees: Price is not valid',
    );
  });
  it('should throws errors when price is not entered', () => {
    expect(() => calculateCCFees(undefined)).toThrow(
      'helpers/transaction/calculateCCFees: Price is not valid',
    );
    expect(() => calculateCCFees(null)).toThrow(
      'helpers/transaction/calculateCCFees: Price is not valid',
    );
  });
});
