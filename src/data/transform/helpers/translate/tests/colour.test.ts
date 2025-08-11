import { describe, it, expect } from 'vitest';
import { translateColour, validColours } from '../colour';
import type { Colour } from '@customTypes/Colour';

describe('translateColour', () => {
    it('returns "None" when input is null', () => {
        const result: Colour = translateColour(null);
        expect(result).toBe('None');
    });

    it('returns the correct Colour when input is a valid colour string', () => {
        for (const colour of validColours) {
            expect(translateColour(colour)).toBe(colour);
        }
    });

    it('throws an error when input is an invalid colour string', () => {
        const invalidColours: string[] = ['Biege', 'Blue', '', 'Green', 'Mother of Pearl']
        for (const ic of invalidColours) {
            expect(() => translateColour(ic)).toThrowError(`Unexpected "color" property: ${ic}`);
        }
        // case sensitive
        for (const vc of validColours) {
            expect(() => translateColour(vc.toLowerCase())).toThrowError(`Unexpected "color" property: ${vc.toLowerCase()}`);
        }
    });
});
