import { describe, it, expect } from 'vitest';
import { convertFlagToBoolean } from '../xFlagToBoolean';

describe('convertFlagToBoolean', () => {
    it('returns true when value is "X"', () => {
        expect(convertFlagToBoolean('X')).toBe(true);
    });

    it('returns false when value is undefined', () => {
        expect(convertFlagToBoolean(undefined)).toBe(false);
    });

    it('returns false when value is an empty string', () => {
        expect(convertFlagToBoolean('')).toBe(false);
    });

    it('returns false when value is any other string', () => {
        expect(convertFlagToBoolean('Y')).toBe(false);
        expect(convertFlagToBoolean('true')).toBe(false);
        expect(convertFlagToBoolean('0')).toBe(false);
        // case-senstive check
        expect(convertFlagToBoolean('x')).toBe(false);
    });
});
