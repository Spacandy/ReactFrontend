import calculateTicketServiceFees from './calculateTicketServiceFees';

describe('Ticket Service Fees', () => {
  it('$5 ticket should have a 1.13 service fee', () => {
    expect(calculateTicketServiceFees(5, undefined, 0.99)).toBeCloseTo(1.14);
    expect(typeof calculateTicketServiceFees(5)).toBe('number');
  });
  it('$5 ticket should have a 2.13 service fee', () => {
    expect(calculateTicketServiceFees(5, 0.05, 1.99)).toBeCloseTo(2.24);
    expect(typeof calculateTicketServiceFees(5)).toBe('number');
  });
  it('$20 ticket should have a 1.57 service fee', () => {
    expect(calculateTicketServiceFees(20)).toBeCloseTo(1.57);
    expect(typeof calculateTicketServiceFees(20)).toBe('number');
  });
  it('$200 ticket should have a 6.79 service fee', () => {
    expect(calculateTicketServiceFees(200)).toBeCloseTo(6.79);
    expect(typeof calculateTicketServiceFees(200)).toBe('number');
  });
  it('$372.34 ticket should have a 11.79 service fee', () => {
    expect(calculateTicketServiceFees(372.34)).toBeCloseTo(11.79);
    expect(typeof calculateTicketServiceFees(372.34)).toBe('number');
  });
  it('$1123.23 tickets should cap at 19.99 service fee', () => {
    expect(calculateTicketServiceFees(1123.23)).toBeCloseTo(19.99);
    expect(typeof calculateTicketServiceFees(1123.23)).toBe('number');
  });
  it('$9999.99 tickets should cap at 19.99 service fee', () => {
    expect(calculateTicketServiceFees(9999.99)).toBeCloseTo(19.99);
    expect(typeof calculateTicketServiceFees(9999.99)).toBe('number');
  });
  it('should throws errors when price is Object', () => {
    expect(() => calculateTicketServiceFees({})).toThrow(
      'helpers/transaction/calculateTicketServiceFees: Price is invalid',
    );
  });
  it('should throws errors when price is Array', () => {
    expect(() => calculateTicketServiceFees([])).toThrow(
      'helpers/transaction/calculateTicketServiceFees: Price is invalid',
    );
  });
  it('should throws errors when price is not entered', () => {
    expect(() => calculateTicketServiceFees(undefined)).toThrow(
      'helpers/transaction/calculateTicketServiceFees: Price is invalid',
    );
    expect(() => calculateTicketServiceFees(null)).toThrow(
      'helpers/transaction/calculateTicketServiceFees: Price is invalid',
    );
  });
});
