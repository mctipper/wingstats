import { describe, it, expect } from 'vitest';
import { binomialCoefficient } from '@logic/utils/binomialCoefficient';

describe('binomialCoefficient', () => {
    it.each([
        // base cases
        [1, -1, 0],
        [1, 2, 0],
        [1, 0, 1],
        [1, 1, 1],
        [1000, 1000, 1],
        // non-base
        [5, 2, 10],
        [6, 3, 20],
        [7, 4, 35],
        [10, 5, 252],
        [12, 6, 924],
        [20, 10, 184756],
        [30, 15, 155117520],
    ])('computes binomialCoefficient(%i, %i) = %i', (n, k, expected) => {
        expect(binomialCoefficient(n, k)).toBeCloseTo(expected);
    });

})