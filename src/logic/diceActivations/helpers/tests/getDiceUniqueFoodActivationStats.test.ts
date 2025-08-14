import { describe, it, expect } from 'vitest';
import { allDice } from '@definitions/diceDefinitions';
import type { DiceActivations, Die } from '@customTypes';
import { getDiceUniqueFoodActivationStats } from '@logic/diceActivations/helpers/getDiceUniqueFoodActivationStats';
import { DieLogic } from '@logic/dieLogic';

type TestCase = {
    die: Die,
    dieCount: number,
    activationName: DiceActivations,
    expected: {
        failure: number;
        anySuccess: number;
        expectedValue: number;
    };
};

const positiveCases: TestCase[] = [
    { die: allDice.basegame, dieCount: 5, activationName: 'maskedLapwing', expected: { failure: 0, anySuccess: 1, expectedValue: 3.5350 } },
    { die: allDice.oceania, dieCount: 5, activationName: 'maskedLapwing', expected: { failure: 0, anySuccess: 1, expectedValue: 4.4 } },
];

describe('getDiceUniqueFoodActivationStats', () => {
    it.each(positiveCases)(
        'computes correct stats for $die using $dieCount dice',
        ({ die, dieCount, activationName, expected }) => {
            const result = getDiceUniqueFoodActivationStats(activationName, die, dieCount);

            expect(result.failure).toBeCloseTo(expected.failure, 4);
            expect(result.anySuccess).toBeCloseTo(expected.anySuccess, 4);
            expect(result.expectedValue).toBeCloseTo(expected.expectedValue, 4);

            // validate 'distribution' keys and values match
            expect(result.distribution).not.toHaveProperty('0');
            expect(Object.keys(result.distribution).length).toBe(DieLogic.getAllUniqueFoodsOnDie(die).length);
            const successDistrubutionSum = Object.keys(result.distribution)
                .filter(k => Number(k) > 0)
                .reduce((acc, k) => acc + result.distribution[Number(k)], 0);
            expect(result.anySuccess).toBeCloseTo(successDistrubutionSum, 4);
        }
    )
}
)