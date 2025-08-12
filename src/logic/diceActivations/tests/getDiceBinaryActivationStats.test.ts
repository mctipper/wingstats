import { describe, it, expect } from 'vitest';
import { allDice } from '@data/diceDefinitions';
import type { Food } from '@customTypes';
import { getDiceBinaryActivationStats } from '../getDiceBinaryActivationStats';

type TestCase = {
    food: Food | Food[];
    rolls: number;
    expected: {
        failure: number;
        anySuccess: number;
        expectedValue: number;
    };
};

const cases: TestCase[] = [
    // one food on one face
    { food: 'Fish', rolls: 1, expected: { failure: 0.8334, anySuccess: 0.1666, expectedValue: 0.1666 } },
    { food: 'Fish', rolls: 5, expected: { failure: 0.4019, anySuccess: 0.5981, expectedValue: 0.5981 } },
    // one food on two faces
    { food: 'Seed', rolls: 1, expected: { failure: 0.6667, anySuccess: 0.3334, expectedValue: 0.3334 } },
    { food: 'Seed', rolls: 3, expected: { failure: 0.2963, anySuccess: 0.7037, expectedValue: 0.7037 } },
    // two food, each on one face
    { food: ['Rodent', 'Fruit'], rolls: 1, expected: { failure: 0.6667, anySuccess: 0.3334, expectedValue: 0.3334 } },
    { food: ['Rodent', 'Fruit'], rolls: 4, expected: { failure: 0.1975, anySuccess: 0.8025, expectedValue: 0.8025 } },
    // two food, both on two faces (but one is shared)
    { food: ['Invertebrate', 'Seed'], rolls: 1, expected: { failure: 0.5, anySuccess: 0.5, expectedValue: 0.5 } },
    { food: ['Invertebrate', 'Seed'], rolls: 2, expected: { failure: 0.25, anySuccess: 0.75, expectedValue: 0.75 } },
    // four food, mixture
    { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], rolls: 1, expected: { failure: 0.1667, anySuccess: 0.8334, expectedValue: 0.8334 } },
    { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], rolls: 5, expected: { failure: 0.0001, anySuccess: 0.9999, expectedValue: 0.9999 } },
];

describe('getDiceBinaryActivationStats', () => {
    it.each(cases)(
        'computes correct stats for $food with $rolls roll(s)',
        ({ food, rolls, expected }) => {
            const result = getDiceBinaryActivationStats(allDice.basegame, food, rolls);

            expect(result.failure).toBeCloseTo(expected.failure);
            expect(result.anySuccess).toBeCloseTo(expected.anySuccess);
            expect(result.expectedValue).toBeCloseTo(expected.expectedValue);

            expect(result.failure).toEqual(result.distribution[0]);
            expect(result.anySuccess).toEqual(result.distribution[1]);
            expect(result.anySuccess).toEqual(result.expectedValue);
        }
    )
});