import { describe, it, expect } from 'vitest';
import { nestMatches } from '@logic/nest';
import type { Nest } from '@customTypes';

const allNests: Nest[] = ['None', 'Cavity', 'Platform', 'Ground', 'Bowl', 'Star']
const baseNests: Nest[] = ['Cavity', 'Platform', 'Ground', 'Bowl']

describe('nestMatches', () => {
    it('return based on matching with "None"', () => {
        for (const vn of allNests) {
            if (vn === 'None') {
                // None is the only that will match with None
                expect(nestMatches(vn, 'None')).toBe(true);
            } else {
                // all others fail match (including Star)
                expect(nestMatches(vn, 'None')).toBe(false)
            }
        }
    });

    it('return true based on baseNest matching self', () => {
        for (const bn of baseNests) {
            expect(nestMatches(bn, bn)).toBe(true);
        }
    });

    it('return true based on Star matching baseNest', () => {
        for (const bn of baseNests) {
            expect(nestMatches('Star', bn)).toBe(true);
        }
    });

    it('return true for Star matching Star', () => {
        expect(nestMatches('Star', 'Star')).toBe(true);
    });

    it('return false for baseNest matching Star', () => {
        for (const bn of baseNests) {
            expect(nestMatches(bn, 'Star')).toBe(false);
        }
    });
}
)