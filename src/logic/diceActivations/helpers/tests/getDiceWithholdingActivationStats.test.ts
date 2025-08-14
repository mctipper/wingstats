import { describe, it, expect } from 'vitest';
import { allDice } from '@definitions/diceDefinitions';
import type { DiceActivations, Die, Food } from '@customTypes';
import { getDiceWithholdingActivationStats } from '@logic/diceActivations/helpers/getDiceWithholdingActivationStats';

type TestCase = {
    die: Die,
    targetFood: Food | Food[],
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
    { die: allDice.basegame, targetFood: 'Rodent', dieCount: 5, rollCount: 3, activationName: 'philippineEagle', expected: { failure: 0.6452, anySuccess: 0.3548, expectedValue: 0.3548 } },
];

describe('getDiceUniqueFoodActivationStats', () => {
    it.each(positiveCases)(
        'computes correct stats for $die using $dieCount dice',
        ({ activationName, die, targetFood, dieCount, rollCount, expected }) => {
            const result = getDiceWithholdingActivationStats(activationName, die, targetFood, dieCount, rollCount);

            expect(result.failure).toBeCloseTo(expected.failure, 4);
            expect(result.anySuccess).toBeCloseTo(expected.anySuccess, 4);
            expect(result.expectedValue).toBeCloseTo(expected.expectedValue, 4);

            // validate 'distribution' keys and values match
            expect(result.failure).toEqual(result.distribution[0]);
            expect(result.anySuccess).toEqual(result.distribution[1]);
            expect(result.anySuccess).toEqual(result.expectedValue);
        }
    )
}
)