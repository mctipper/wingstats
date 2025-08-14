import { describe, it, expect } from 'vitest';
import { allDice } from '@definitions/diceDefinitions';
import type { DiceActivations, Food } from '@customTypes';
import { getDiceSequentialActivationStats } from '@logic/diceActivations/helpers/getDiceSequentialActivationStats';

type TestCase = {
    food: Food | Food[];
    dieCount: number,
    rollCount: number,
    activationName: DiceActivations,
    expected: {
        failure: number;
        anySuccess: number;
        expectedValue: number;
    };
};

const positiveCases: TestCase[] = [
    // one food on one face
    { food: ['Rodent'], dieCount: 5, rollCount: 3, activationName: 'pushYourLuck', expected: { failure: 0.7860, anySuccess: 0.2140, expectedValue: 0.6419 } },
    { food: ['Rodent'], dieCount: 3, rollCount: 3, activationName: 'pushYourLuck', expected: { failure: 0.9252, anySuccess: 0.0748, expectedValue: 0.2243 } },
    { food: ['Rodent'], dieCount: 5, rollCount: 1, activationName: 'pushYourLuck', expected: { failure: 0.4019, anySuccess: 0.5981, expectedValue: 0.5981 } },
    { food: ['Fish', 'Rodent'], dieCount: 2, rollCount: 3, activationName: 'pushYourLuck', expected: { failure: 0.8285, anySuccess: 0.1715, expectedValue: 0.5144 } },
    { food: ['Invertebrate', 'Rodent'], dieCount: 2, rollCount: 2, activationName: 'pushYourLuck', expected: { failure: 0.4375, anySuccess: 0.5625, expectedValue: 1.125 } },
    { food: ['Fish', 'Rodent', 'Seed', 'Invertebrate', 'Fruit'], dieCount: 1, rollCount: 1, activationName: 'pushYourLuck', expected: { failure: 0, anySuccess: 1, expectedValue: 1 } },
];

describe('getDicegetDiceSequentialActivationStatsBinaryActivationStats', () => {
    it.each(positiveCases)(
        'computes correct stats for $food, $dieCount dice and $rollCount roll(s)',
        ({ food, dieCount, rollCount, activationName, expected }) => {
            const result = getDiceSequentialActivationStats(activationName, allDice.basegame, food, dieCount, rollCount);

            expect(result.failure).toBeCloseTo(expected.failure, 4);
            expect(result.anySuccess).toBeCloseTo(expected.anySuccess, 4);
            expect(result.expectedValue).toBeCloseTo(expected.expectedValue, 4);

            // validate 'distribution' keys and values match
            expect(result.failure).toEqual(result.distribution[0]);
            expect(result.anySuccess).toEqual(result.distribution[rollCount]);
            expect(result.anySuccess * rollCount).toEqual(result.expectedValue);
        }
    );
})