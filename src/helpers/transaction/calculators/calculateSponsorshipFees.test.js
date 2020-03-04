import calculateSponsorshipFees from './calculateSponsorshipFees';

describe('Sponsorship Fees', () => {
  it('$1,000 sponsorship should have a $59.99 cc fee', () => {
    expect(calculateSponsorshipFees(1000, 'pass')).toBeCloseTo(59.99);
    expect(typeof calculateSponsorshipFees(1000, 'pass')).toBe('number');
  });
  it('$2,000 sponsorship should have a $118.99 cc fee', () => {
    expect(calculateSponsorshipFees(2000, 'pass')).toBeCloseTo(118.99);
    expect(typeof calculateSponsorshipFees(2000, 'pass')).toBe('number');
  });
  it('$3,500 sponsorship should have a $207.49 cc fee', () => {
    expect(calculateSponsorshipFees(3500, 'pass')).toBeCloseTo(207.49);
    expect(typeof calculateSponsorshipFees(3500, 'pass')).toBe('number');
  });
  it('$5,000 sponsorship should have a $295.99 cc fee', () => {
    expect(calculateSponsorshipFees(5000, 'pass')).toBeCloseTo(295.99);
    expect(typeof calculateSponsorshipFees(5000, 'pass')).toBe('number');
  });
  it('$10,000 sponsorship should have a $590.99 cc fee', () => {
    expect(calculateSponsorshipFees(10000, 'pass')).toBeCloseTo(590.99);
    expect(typeof calculateSponsorshipFees(10000, 'pass')).toBe('number');
  });
  it('$25,000 sponsorship should have a $1,475.99 fee', () => {
    expect(calculateSponsorshipFees(25000, 'pass')).toBeCloseTo(1475.99);
    expect(typeof calculateSponsorshipFees(25000, 'pass')).toBe('number');
  });
  it('should throws errors when price is not entered', () => {
    expect(() => calculateSponsorshipFees(undefined)).toThrow(
      'helpers/transaction/calculateSponsorshipFees: Price is not valid',
    );
    expect(() => calculateSponsorshipFees(null)).toThrow(
      'helpers/transaction/calculateSponsorshipFees: Price is not valid',
    );
  });
  it('should throws errors when price is Object', () => {
    expect(() => calculateSponsorshipFees({}, 'pass')).toThrow(
      'helpers/transaction/calculateSponsorshipFees: Price is not valid',
    );
  });
  it('should throws errors when price is Array', () => {
    expect(() => calculateSponsorshipFees([], 'absorb')).toThrow(
      'helpers/transaction/calculateSponsorshipFees: Price is not valid',
    );
  });
  it('should throws errors when price is not entered', () => {
    expect(() => calculateSponsorshipFees(undefined, 'pass')).toThrow(
      'helpers/transaction/calculateSponsorshipFees: Price is not valid',
    );
    expect(() => calculateSponsorshipFees(null, 'absorb')).toThrow(
      'helpers/transaction/calculateSponsorshipFees: Price is not valid',
    );
  });
});
