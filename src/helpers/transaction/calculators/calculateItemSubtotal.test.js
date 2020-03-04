import calculateItemSubtotal from './calculateItemSubtotal';

describe('Item Subtotal', () => {
  it('1 $5 ticket should be 6.32', () => {
    expect(calculateItemSubtotal(5, 1, 'ticket')).toBeCloseTo(6.32);
    expect(typeof calculateItemSubtotal(5, 1, 'ticket')).toBe('number');
  });
  it('2 $5 ticket should be 12.64', () => {
    expect(calculateItemSubtotal(5, 2, 'ticket')).toBeCloseTo(12.64);
    expect(typeof calculateItemSubtotal(5, 2, 'ticket')).toBe('number');
  });
  it('3 $5 ticket should be 18.96', () => {
    expect(calculateItemSubtotal(5, 3, 'ticket')).toBeCloseTo(18.96);
    expect(typeof calculateItemSubtotal(5, 3, 'ticket')).toBe('number');
  });
  it('1 $45 ticket should be 48.71', () => {
    expect(calculateItemSubtotal(45, 1, 'ticket')).toBeCloseTo(48.71);
    expect(typeof calculateItemSubtotal(45, 1, 'ticket')).toBe('number');
  });
  it('2 $15 tickets should be 33.84', () => {
    expect(calculateItemSubtotal(15, 2, 'ticket')).toBeCloseTo(33.84);
    expect(typeof calculateItemSubtotal(15, 2, 'ticket')).toBe('number');
  });
  it('1s $20 tickets should be 22.22', () => {
    expect(calculateItemSubtotal(20, 1, 'ticket')).toBeCloseTo(22.22);
    expect(typeof calculateItemSubtotal(20, 1, 'ticket')).toBe('number');
  });
  it('$1,000 sponsorship should have a 59.99 cc fee', () => {
    expect(calculateItemSubtotal(1000, 1, 'sponsorship')).toBeCloseTo(1059.99);
    expect(typeof calculateItemSubtotal(1000, 1, 'sponsorship')).toBe('number');
  });
  it('$2,000 sponsorship should have a $118.99 cc fee', () => {
    expect(calculateItemSubtotal(2000, 1, 'sponsorship')).toBeCloseTo(2118.99);
    expect(typeof calculateItemSubtotal(2000, 1, 'sponsorship')).toBe('number');
  });
  it('$3,500 sponsorship should have a $207.49 cc fee', () => {
    expect(calculateItemSubtotal(3500, 1, 'sponsorship')).toBeCloseTo(3707.49);
    expect(typeof calculateItemSubtotal(3500, 1, 'sponsorship')).toBe('number');
  });
  it('$5,000 sponsorship should have a $295.99 cc fee', () => {
    expect(calculateItemSubtotal(5000, 1, 'sponsorship')).toBeCloseTo(5295.99);
    expect(typeof calculateItemSubtotal(5000, 1, 'sponsorship')).toBe('number');
  });
  it('$10,000 sponsorship should have a $590.99 cc fee', () => {
    expect(calculateItemSubtotal(10000, 1, 'sponsorship')).toBeCloseTo(10590.99);
    expect(typeof calculateItemSubtotal(10000, 1, 'sponsorship')).toBe('number');
  });
  it('$25,000 sponsorship should have a $1,475.99 fee', () => {
    expect(calculateItemSubtotal(25000, 1, 'sponsorship')).toBeCloseTo(26475.99);
    expect(typeof calculateItemSubtotal(10000, 1, 'sponsorship')).toBe('number');
  });
  it('any item type besides ["ticket", "sponsorship"] should fail', () => {
    expect(() => calculateItemSubtotal(25000, 1, null)).toThrowError(
      'helpers/transaction/calculateItemSubtotal: itemType is not valid',
    );
    expect(() => calculateItemSubtotal(25000, 1, undefined)).toThrowError(
      'helpers/transaction/calculateItemSubtotal: itemType is not valid',
    );
    expect(() => calculateItemSubtotal(25000, 1, [])).toThrowError(
      'helpers/transaction/calculateItemSubtotal: itemType is not valid',
    );
    expect(() => calculateItemSubtotal(25000, 1, {})).toThrowError(
      'helpers/transaction/calculateItemSubtotal: itemType is not valid',
    );
    expect(() => calculateItemSubtotal(25000, 1, 'xxx')).toThrowError(
      'helpers/transaction/calculateItemSubtotal: itemType is not valid',
    );
  });
  it('if not a valid quantity it should fail', () => {
    expect(() => calculateItemSubtotal(25000, null, 'ticket')).toThrowError(
      'helpers/transaction/calculateItemSubtotal: Quantity is not valid',
    );
    expect(() => calculateItemSubtotal(25000, undefined, 'ticket')).toThrowError(
      'helpers/transaction/calculateItemSubtotal: Quantity is not valid',
    );
    expect(() => calculateItemSubtotal(25000, [], 'ticket')).toThrowError(
      'helpers/transaction/calculateItemSubtotal: Quantity is not valid',
    );
    expect(() => calculateItemSubtotal(25000, {}, 'ticket')).toThrowError(
      'helpers/transaction/calculateItemSubtotal: Quantity is not valid',
    );
  });
  it('if not a valid price it should fail', () => {
    expect(() => calculateItemSubtotal(null, 1, 'ticket')).toThrowError(
      'helpers/transaction/calculateItemSubtotal: Price is not valid',
    );
    expect(() => calculateItemSubtotal(undefined, 1, 'ticket')).toThrowError(
      'helpers/transaction/calculateItemSubtotal: Price is not valid',
    );
    expect(() => calculateItemSubtotal([], 1, 'ticket')).toThrowError(
      'helpers/transaction/calculateItemSubtotal: Price is not valid',
    );
    expect(() => calculateItemSubtotal({}, 1, 'ticket')).toThrowError(
      'helpers/transaction/calculateItemSubtotal: Price is not valid',
    );
  });
});
