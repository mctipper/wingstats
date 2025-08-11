import { describe, it, expect } from 'vitest';
import { translateNest } from '@data/transform/helpers/translate/nest';
import type { Nest } from '@customTypes/Nest';

describe('translateNest', () => {
    it('translates "Wild" to "Star"', () => {
        const result: Nest = translateNest('Wild');
        expect(result).toBe('Star');
    });

    it('returns the same value for valid nest types', () => {
        const validNests: Nest[] = ['None', 'Cavity', 'Platform', 'Ground', 'Bowl'];
        for (const nest of validNests) {
            expect(translateNest(nest)).toBe(nest);
        }
    });

    it('throws an error for invalid nest types', () => {
        const invalidInputs = ['wild', 'Tree', '', 'Burrow'];
        for (const raw of invalidInputs) {
            expect(() => translateNest(raw)).toThrowError(`Unexpected "Nest" property: ${raw}`);
        }
    });

    it('throws an error for "Star" nest type (expect "Wild" in data source', () => {
        expect(() => translateNest('Star')).toThrowError(`Unexpected "Nest" property: Star`);
    });
});
