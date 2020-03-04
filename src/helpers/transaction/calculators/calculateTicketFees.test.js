import calculateTicketFees from './calculateTicketFees';

describe('Ticket Fees', () => {
  it('$0 ticket should have no fee', () => {
    expect(calculateTicketFees(0)).toBeCloseTo(0);
    expect(typeof calculateTicketFees(0)).toBe('number');
  });
  it('$5 ticket should have a $1.32 fee', () => {
    expect(calculateTicketFees(5)).toBeCloseTo(1.32);
    expect(typeof calculateTicketFees(5)).toBe('number');
  });
  it('$15 ticket should have a $1.92 fee', () => {
    expect(calculateTicketFees(15)).toBeCloseTo(1.92);
    expect(typeof calculateTicketFees(15)).toBe('number');
  });
  it('$20 ticket should have a $2.22 fee', () => {
    expect(calculateTicketFees(20)).toBeCloseTo(2.22);
    expect(typeof calculateTicketFees(20)).toBe('number');
  });
  it('$45 ticket should have a $3.71 fee', () => {
    expect(calculateTicketFees(45)).toBeCloseTo(3.71);
    expect(typeof calculateTicketFees(45)).toBe('number');
  });
  it('$200 tickets should have a $12.99 fee', () => {
    expect(calculateTicketFees(200)).toBeCloseTo(12.99);
    expect(typeof calculateTicketFees(200)).toBe('number');
  });
  it('$900 tickets should have a $47.59 fee', () => {
    expect(calculateTicketFees(900)).toBeCloseTo(47.59);
    expect(typeof calculateTicketFees(900)).toBe('number');
  });
  it('should throws errors when price is Object', () => {
    expect(() => calculateTicketFees({})).toThrow(
      'helpers/transaction/calculateTicketFees: Price is not valid',
    );
  });
  it('should throws errors when price is Array', () => {
    expect(() => calculateTicketFees([])).toThrow(
      'helpers/transaction/calculateTicketFees: Price is not valid',
    );
  });
  it('should throws errors when price is NaN', () => {
    expect(() => calculateTicketFees('aaa')).toThrow(
      'helpers/transaction/calculateTicketFees: Price is NaN',
    );
  });
  it('should throws errors when price is not entered', () => {
    expect(() => calculateTicketFees(undefined)).toThrow(
      'helpers/transaction/calculateTicketFees: Price is not valid',
    );
    expect(() => calculateTicketFees(null)).toThrow(
      'helpers/transaction/calculateTicketFees: Price is not valid',
    );
  });
});
