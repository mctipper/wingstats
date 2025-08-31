import { describe, it, expect, vi, beforeEach } from 'vitest';
import { philippineEagleLogic, getPhilippineEagleActivation } from '@logic/diceActivations/philippineEagle'
import { getDiceWithholdingActivationStats } from '@logic/diceActivations/helpers';
import type { DiceActivations, Food, ActivationStats, DiceActivationInput } from '@customTypes';
import { baseGameDie } from '@definitions/diceDefinitions';
import * as diceActvationLogic from '@logic/diceActivations/philippineEagle';


const mockActivationStatsResult: ActivationStats = {
    activationName: '__TEST__',
    distribution: { 0: 0.1, 1: 0.9 },
    anySuccess: 0.9,
    failure: 0.1,
    expectedValue: 0.9,
};

vi.mock('@logic/diceActivations/helpers', () => ({
    getDiceWithholdingActivationStats: vi.fn(() => (mockActivationStatsResult))
}));

describe('philippineEagle logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'philippineEagle'
    const food: Food = 'Rodent';
    const dieCount: number = 5;
    const rollCount: number = 3;

    it('calls getDiceWithholdingActivationStats"', () => {
        philippineEagleLogic(baseGameDie, food, dieCount, rollCount);

        expect(getDiceWithholdingActivationStats).toHaveBeenCalledWith(activationName, baseGameDie, food, dieCount, rollCount);
    });
});


describe('getPhilippineEagleActivation', () => {
    it('return correct activation structure and contents for each bird (specifics mocked)', () => {
        vi.spyOn(diceActvationLogic, 'philippineEagleLogic').mockImplementation(() => mockActivationStatsResult as ActivationStats);

        const testBirds: DiceActivationInput[] = [
            { birdName: 'Philippine Eagle', targetFood: 'Rodent', dieCount: 5, rollCount: 3, activationResultMode: 'withholding' },
        ];

        const results = getPhilippineEagleActivation(testBirds);

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