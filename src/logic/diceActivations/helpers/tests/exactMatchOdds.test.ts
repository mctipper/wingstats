import { describe, it, expect } from 'vitest';
import { allDice } from '@definitions/diceDefinitions';
import type { Food } from '@customTypes';
import { getExactMatchExcludingTargetOdds } from '../exactMatchOdds';

type TestCase = {
    food: Food | Food[];
    rolls: number;
    expected: number
};

const positiveCases: TestCase[] = [
    { food: 'Fish', rolls: 2, expected: 0.1389 },
    { food: 'Fish', rolls: 5, expected: 0.0006 },
    { food: 'Invertebrate', rolls: 3, expected: 0.0185 },
    { food: 'Invertebrate', rolls: 4, expected: 0.0031 },
    { food: ['Fish', 'Seed'], rolls: 3, expected: 0.0139 },
    { food: ['Fish', 'Seed'], rolls: 5, expected: 0.0004 },
    { food: ['Fish', 'Invertebrate', 'Fruit', 'Rodent', 'Seed'], rolls: 2, expected: 0 },
    { food: ['Fish', 'Invertebrate', 'Fruit', 'Rodent', 'Seed'], rolls: 4, expected: 0 },
];

const errorCases: TestCase[] = [
    // expect all these to throw errors (hence dummy expected values)
    { food: 'Fish', rolls: 1, expected: 0 },
    { food: ['Rodent', 'Fruit'], rolls: 1, expected: 0 },
];


describe('getDiceBinaryActivationStats', () => {
    it.each(positiveCases)(
        'computes correct stats for $food with $rolls roll(s)',
        ({ food, rolls, expected }) => {
            const result = getExactMatchExcludingTargetOdds(allDice.basegame, food, rolls);
            expect(result).toBeCloseTo(expected, 4);
        }
    );

    it.each(errorCases)(
        'errow thrown when rollCount is 1',
        ({ food, rolls }) => {
            expect(() => {
                getExactMatchExcludingTargetOdds(allDice.basegame, food, rolls);
            }).toThrow();
        }
    )
})