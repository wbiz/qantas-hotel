import { getRatingStyles } from '@/lib/utils.ts'

describe('getRatingStyles', () => {
  test('handles integer ratings', () => {
    expect(getRatingStyles(3)).toEqual(['filled', 'filled', 'filled', 'empty', 'empty']);
    expect(getRatingStyles(5)).toEqual(['filled', 'filled', 'filled', 'filled', 'filled']);
    expect(getRatingStyles(0)).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
  });

  test('handles fractional ratings', () => {
    expect(getRatingStyles(3.5)).toEqual(['filled', 'filled', 'filled', 'half', 'empty']);
    expect(getRatingStyles(2.7)).toEqual(['filled', 'filled', 'half', 'empty', 'empty']);
    expect(getRatingStyles(4.2)).toEqual(['filled', 'filled', 'filled', 'filled', 'half']);
  });

  test('handles edge cases', () => {
    // Negative ratings
    expect(getRatingStyles(-1)).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);

    // Ratings at or above 5
    expect(getRatingStyles(5)).toEqual(['filled', 'filled', 'filled', 'filled', 'filled']);
    expect(getRatingStyles(6)).toEqual(['filled', 'filled', 'filled', 'filled', 'filled']);

    // Very small positive ratings
    expect(getRatingStyles(0.1)).toEqual(['half', 'empty', 'empty', 'empty', 'empty']);

    // Ratings just below whole numbers
    expect(getRatingStyles(2.99)).toEqual(['filled', 'filled', 'half', 'empty', 'empty']);

    // Ratings just above whole numbers
    expect(getRatingStyles(3.01)).toEqual(['filled', 'filled', 'filled', 'half', 'empty']);
  });

  test('handles invalid inputs', () => {
    // NaN
    expect(getRatingStyles(NaN)).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);

    // Infinity (treated as >= 5)
    expect(getRatingStyles(Infinity)).toEqual(['filled', 'filled', 'filled', 'filled', 'filled']);

    // Negative Infinity
    expect(getRatingStyles(-Infinity)).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
  });

  test('returns correct array length', () => {
    expect(getRatingStyles(3).length).toBe(5);
    expect(getRatingStyles(0).length).toBe(5);
    expect(getRatingStyles(10).length).toBe(5);
  });

  test('returns correct types', () => {
    const result = getRatingStyles(3.5);
    result.forEach(item => {
      expect(['filled', 'half', 'empty']).toContain(item);
    });
  });
});

