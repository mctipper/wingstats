import { describe, it, expect } from 'vitest';
import { convertNullToZero } from '@data/transform/helpers/convert/nullToZero';

describe('convertNullToZero', () => {
    it('returns 0 when value is undefined', () => {
        expect(convertNullToZero(undefined)).toBe(0);
    });


    it('returns 0 when value is null (if null is passed)', () => {
        // force null as number
        expect(convertNullToZero(null as unknown as number | undefined)).toBe(0);
    });

    it('returns the number itself when value is a valid number', () => {
        const validNumbers: number[] = [1, 5, 30, 236, 12, 47]
        for (const vn of validNumbers) {
            expect(convertNullToZero(vn)).toBe(vn);
        }
        // explicit edge-case of zero equality
        expect(convertNullToZero(0)).toBe(0);
    });
});
