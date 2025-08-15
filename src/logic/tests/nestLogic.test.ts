import { describe, it, expect } from 'vitest';
import { nestMatchLogic } from '@logic/nestLogic';
import type { Nest } from '@customTypes';

const allNests: Nest[] = ['None', 'Cavity', 'Platform', 'Ground', 'Bowl', 'Star']
const baseNests: Nest[] = ['Cavity', 'Platform', 'Ground', 'Bowl']

describe('nestMatchLogic', () => {
    it('return based on matching with "None"', () => {
        for (const vn of allNests) {
            if (vn === 'None') {
                // None is the only that will match with None
                expect(nestMatchLogic(vn, 'None')).toBe(true);
            } else {
                // all others fail match (including Star)
                expect(nestMatchLogic(vn, 'None')).toBe(false)
            }
        }
    });

    it('return true based on baseNest matching self', () => {
        for (const bn of baseNests) {
            expect(nestMatchLogic(bn, bn)).toBe(true);
        }
    });

    it('return true based on Star matching baseNest', () => {
        for (const bn of baseNests) {
            expect(nestMatchLogic('Star', bn)).toBe(true);
        }
    });

    it('return true for Star matching Star', () => {
        expect(nestMatchLogic('Star', 'Star')).toBe(true);
    });

    it('return false for baseNest matching Star', () => {
        for (const bn of baseNests) {
            expect(nestMatchLogic(bn, 'Star')).toBe(false);
        }
    });
}
)