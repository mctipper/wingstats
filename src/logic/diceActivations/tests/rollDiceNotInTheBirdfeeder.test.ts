import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rollDiceNotInTheBirdfeederLogic, getRollDiceNotInTheBirdfeederActivation } from '@logic/diceActivations/rollDiceNotInTheBirdfeeder'
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import type { DiceActivations, Food, ActivationStats, DiceActivationInput } from '@customTypes';
import * as diceActvationLogic from '@logic/diceActivations/rollDiceNotInTheBirdfeeder';
import { baseGameDie } from '@definitions/diceDefinitions';


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


describe('rollDiceNotInTheBirdfeeder logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'rollDiceNotInTheBirdfeeder'
    const food: Food = 'Fish';
    const dieCount: number = 3;
    const permitReroll: boolean = false;

    it('throw when dieCount > 4', () => {
        const invalidDieCounts: number[] = [5, 6, 1000];
        for (const idc of invalidDieCounts) {
            expect(() => {
                rollDiceNotInTheBirdfeederLogic(baseGameDie, food, idc, 'binomial');
            }).toThrow();
        }
    });

    it('calls getDiceBinaryActivationStats when mode is "binary"', () => {
        rollDiceNotInTheBirdfeederLogic(baseGameDie, food, dieCount, 'binary');

        expect(getDiceBinaryActivationStats).toHaveBeenCalledWith(activationName, baseGameDie, food, dieCount, permitReroll);
        expect(getDiceBinomialActivationStats).not.toHaveBeenCalled();
    });

    it('calls getDiceBinomialActivationStats when mode is "binomial"', () => {
        rollDiceNotInTheBirdfeederLogic(baseGameDie, food, dieCount, 'binomial');

        expect(getDiceBinomialActivationStats).toHaveBeenCalledWith(activationName, baseGameDie, food, dieCount, permitReroll);
        expect(getDiceBinaryActivationStats).not.toHaveBeenCalled();
    });
});


describe('getRollDiceNotInTheBirdfeederActivation', () => {
    it('return correct activation structure and contents for each bird (specifics mocked)', () => {
        vi.spyOn(diceActvationLogic, 'rollDiceNotInTheBirdfeederLogic')
            .mockImplementation(() => mockActivationStatsResult);

        const testBirds: DiceActivationInput[] = [
            { birdName: 'Mississippi Kite', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
            { birdName: 'Northern Gannet', targetFood: 'Fish', dieCount: 4, rollCount: 1, activationResultMode: 'binomial' },
        ];

        const results = getRollDiceNotInTheBirdfeederActivation(testBirds);

        expect(results).toHaveLength(testBirds.length);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const expectedBird = testBirds[i];

            expect(result.birdName).toBe(expectedBird.birdName);
            expect(result.targetFood).toBe(expectedBird.targetFood);
            expect(result.dieCount).toBe(expectedBird.dieCount);
            expect(result.rollCount).toBe(expectedBird.rollCount);
            expect(result.activationResultMode).toBe(expectedBird.activationResultMode);

            expect(Object.keys(result.activationStats)).toHaveLength(expectedBird.dieCount);
        }
    });
});
