import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rollAnyXDiceLogic, getRollAnyXDiceBirdActivations } from '@logic/diceActivations/rollAnyXDie'
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import type { DiceActivations, Food, ActivationStats, DiceActivationInput } from '@customTypes';
import { oceaniaDie } from '@definitions/diceDefinitions';
import * as diceActvationLogic from '@logic/diceActivations/rollAnyXDie';


const mockActivationStatsResult: ActivationStats = {
    activationName: '__TEST__',
    distribution: { 0: 0.1, 1: 0.9 },
    anySuccess: 0.9,
    failure: 0.1,
    expectedValue: 0.9,
};

vi.mock('@logic/diceActivations/helpers', () => ({
    getDiceBinaryActivationStats: vi.fn(() => (mockActivationStatsResult)),
    getDiceBinomialActivationStats: vi.fn(() => (mockActivationStatsResult)),
}));

describe('rollAnyXDice logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'rollAnyXDice'
    const food: Food = 'Fish';
    const dieCount: number = 5;
    const permitReroll: boolean = false;

    it('calls getDiceBinaryActivationStats when mode is "binary"', () => {
        rollAnyXDiceLogic(oceaniaDie, food, dieCount, 'binary');

        expect(getDiceBinaryActivationStats).toHaveBeenCalledWith(activationName, oceaniaDie, food, dieCount, permitReroll);
        expect(getDiceBinomialActivationStats).not.toHaveBeenCalled();
    });

    it('calls getDiceBinomialActivationStats when mode is "binomial"', () => {
        rollAnyXDiceLogic(oceaniaDie, food, dieCount, 'binomial');

        expect(getDiceBinomialActivationStats).toHaveBeenCalledWith(activationName, oceaniaDie, food, dieCount, permitReroll);
        expect(getDiceBinaryActivationStats).not.toHaveBeenCalled();
    });
});


describe('getRollAnyXDiceBirdActivations', () => {
    it('return correct activation structure and contents for each bird (specifics mocked)', () => {
        vi.spyOn(diceActvationLogic, 'rollAnyXDiceLogic').mockImplementation(() => mockActivationStatsResult as ActivationStats);

        const testBirds: DiceActivationInput[] = [
            { birdName: 'Eurasian Kestrel', targetFood: 'Rodent', dieCount: 3, rollCount: 1, activationResultMode: 'binary' },
            { birdName: 'Great Cormorant', targetFood: 'Fish', dieCount: 2, rollCount: 1, activationResultMode: 'binary' },
        ];

        const results = getRollAnyXDiceBirdActivations(testBirds);

        expect(results).toHaveLength(testBirds.length);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const expectedBird = testBirds[i];

            expect(result.birdName).toBe(expectedBird.birdName);
            expect(result.targetFood).toBe(expectedBird.targetFood);
            expect(result.dieCount).toBe(expectedBird.dieCount);
            expect(result.rollCount).toBe(expectedBird.rollCount);
            expect(result.activationResultMode).toBe(expectedBird.activationResultMode);

            // one result only pls
            expect(Object.keys(result.activationStats)).toHaveLength(1);
            expect(result.activationStats[0]).toEqual(mockActivationStatsResult);
        }
    }
    )
})