import { describe, it, expect } from 'vitest';
import { translateExpansion } from '@data/transform/helpers/translate/expansion';

describe('translateExpansion', () => {
    it('returns "BaseGame" for originalcore and swiftstart', () => {
        expect(translateExpansion('originalcore')).toBe('BaseGame');
        expect(translateExpansion('swiftstart')).toBe('BaseGame');
    });

    it('returns correct expansion for european, oceania, and asia', () => {
        expect(translateExpansion('european')).toBe('European');
        expect(translateExpansion('oceania')).toBe('Oceania');
        expect(translateExpansion('asia')).toBe('Asia');
    });

    it('throws an error for unknown expansion strings', () => {
        const invalidInputs = ['core', 'EU', '', 'northamerica', 'basegame'];
        for (const raw of invalidInputs) {
            expect(() => translateExpansion(raw)).toThrowError(`Unexpected "expansion" property: ${raw}`);
        }
    });
});
