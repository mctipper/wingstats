import { describe, it, expect } from 'vitest';
import { allDice } from '@definitions/diceDefinitions';
import type { DiceActivations, Food } from '@customTypes';
import { getDiceBinaryActivationStats } from '../getDiceBinaryActivationStats';

type TestCase = {
    food: Food | Food[];
    rolls: number;
    permitReroll: boolean;
    activationName: DiceActivations,
    expected: {
        failure: number;
        anySuccess: number;
        expectedValue: number;
    };
};

const positiveCases: TestCase[] = [
    // one food on one face
    { food: 'Fish', rolls: 1, activationName: 'rollAnyXDice', permitReroll: false, expected: { failure: 0.8333, anySuccess: 0.1667, expectedValue: 0.1667 } },
    { food: 'Fish', rolls: 5, activationName: 'rollAnyXDice', permitReroll: true, expected: { failure: 0.4015, anySuccess: 0.5985, expectedValue: 0.5985 } },
    { food: 'Fish', rolls: 5, activationName: 'rollAnyXDice', permitReroll: false, expected: { failure: 0.4019, anySuccess: 0.5981, expectedValue: 0.5981 } },
    // one food on two faces
    { food: 'Seed', rolls: 1, activationName: 'rollAnyXDice', permitReroll: false, expected: { failure: 0.6667, anySuccess: 0.3333, expectedValue: 0.3333 } },
    { food: 'Seed', rolls: 3, activationName: 'rollAnyXDice', permitReroll: true, expected: { failure: 0.2830, anySuccess: 0.7170, expectedValue: 0.7170 } },
    // two food, each on one face
    { food: ['Rodent', 'Fruit'], activationName: 'rollAnyXDice', permitReroll: false, rolls: 1, expected: { failure: 0.6667, anySuccess: 0.3333, expectedValue: 0.3333 } },
    { food: ['Rodent', 'Fruit'], activationName: 'rollAnyXDice', permitReroll: true, rolls: 4, expected: { failure: 0.1950, anySuccess: 0.8050, expectedValue: 0.8050 } },
    // two food, both on two faces (but one is shared)
    { food: ['Invertebrate', 'Seed'], activationName: 'rollAnyXDice', permitReroll: false, rolls: 1, expected: { failure: 0.5, anySuccess: 0.5, expectedValue: 0.5 } },
    { food: ['Invertebrate', 'Seed'], activationName: 'rollAnyXDice', permitReroll: true, rolls: 2, expected: { failure: 0.1818, anySuccess: 0.8182, expectedValue: 0.8182 } },
    // three food, mixute
    { food: ['Rodent', 'Fish', 'Invertebrate'], activationName: 'rollAnyXDice', permitReroll: false, rolls: 1, expected: { failure: 0.3333, anySuccess: 0.6667, expectedValue: 0.6667 } },
    { food: ['Rodent', 'Fish', 'Invertebrate'], activationName: 'rollAnyXDice', permitReroll: true, rolls: 5, expected: { failure: 0.0039, anySuccess: 0.9961, expectedValue: 0.9961 } },
    { food: ['Rodent', 'Fish', 'Invertebrate'], activationName: 'rollAnyXDice', permitReroll: false, rolls: 5, expected: { failure: 0.0041, anySuccess: 0.9959, expectedValue: 0.9959 } },
    // four food, mixture allows absolute success
    { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], activationName: 'rollAnyXDice', permitReroll: false, rolls: 2, expected: { failure: 0.0278, anySuccess: 0.9722, expectedValue: 0.9722 } },
    { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], activationName: 'rollAnyXDice', permitReroll: true, rolls: 5, expected: { failure: 0, anySuccess: 1, expectedValue: 1 } },
    { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], activationName: 'rollAnyXDice', permitReroll: false, rolls: 5, expected: { failure: 0.0001, anySuccess: 0.9999, expectedValue: 0.9999 } },
];

const errorCases: TestCase[] = [
    // expect all these to throw errors (hence dummy expected values)
    { food: 'Fish', rolls: 1, activationName: 'rollAnyXDice', permitReroll: true, expected: { failure: 0, anySuccess: 0, expectedValue: 0 } },
    { food: ['Rodent', 'Fruit'], rolls: 1, activationName: 'rollAnyXDice', permitReroll: true, expected: { failure: 0, anySuccess: 0, expectedValue: 0 } },
];


describe('getDiceBinaryActivationStats', () => {
    it.each(positiveCases)(
        'computes correct stats for $food with $rolls roll(s) - permitReroll: $permitReroll',
        ({ food, rolls, activationName, permitReroll, expected }) => {
            const result = getDiceBinaryActivationStats(activationName, allDice.basegame, food, rolls, permitReroll);

            expect(result.failure).toBeCloseTo(expected.failure, 4);
            expect(result.anySuccess).toBeCloseTo(expected.anySuccess, 4);
            expect(result.expectedValue).toBeCloseTo(expected.expectedValue, 4);

            expect(result.failure).toEqual(result.distribution[0]);
            expect(result.anySuccess).toEqual(result.distribution[1]);
            expect(result.anySuccess).toEqual(result.expectedValue);
        }
    );

    it.each(errorCases)(
        'errow thrown when permitRoll is true but rollCount is 1',
        ({ food, rolls, activationName, permitReroll }) => {
            expect(() => {
                getDiceBinaryActivationStats(activationName, allDice.basegame, food, rolls, permitReroll);
            }).toThrow();
        }
    )
})