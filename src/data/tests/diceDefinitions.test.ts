import { describe, it, expect } from 'vitest';
import { baseGameDie, oceaniaDie, allDice } from '@data/diceDefinitions';
import type { Die } from '@customTypes/Die';

describe('Die definitions', () => {
    // these are mostly enforce through Die type definition, but just including some 
    // unit tests to ensure that the Die objects are correctly named and whatnot
    it('baseGameDie exists and is a Die', () => {
        const die: Die = baseGameDie;
        expect(die).toBeDefined();
        expect(die.kind).toBe('basegame');
    });

    it('oceaniaDie exists and is a Die', () => {
        const die: Die = oceaniaDie;
        expect(die).toBeDefined();
        expect(die.kind).toBe('oceania');
    });

    it('allDice includes both die kinds and values are Die', () => {
        expect(allDice.basegame).toBeDefined();
        expect(allDice.oceania).toBeDefined();

        const base: Die = allDice.basegame;
        const oceania: Die = allDice.oceania;

        expect(base.kind).toBe('basegame');
        expect(oceania.kind).toBe('oceania');
    });
});
