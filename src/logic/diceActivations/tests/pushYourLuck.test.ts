import { describe, it, expect, vi, beforeEach } from 'vitest';
import { pushYourLuckLogic, getPushYourLuckActivation } from '@logic/diceActivations/pushYourLuck';
import { getDiceSequentialActivationStats } from '@logic/diceActivations/helpers';
import type { ActivationStats, DiceActivations, DiceActivationInput, Food } from '@customTypes';
import { baseGameDie } from '@definitions/diceDefinitions';
import * as diceActivationLogic from '@logic/diceActivations/pushYourLuck';


const mockActivationStatsResult: ActivationStats = {
    activationName: '__TEST__',
    distribution: { 0: 0.1, 1: 0.9 },
    anySuccess: 0.9,
    failure: 0.1,
    expectedValue: 0.9,
};

vi.mock('@logic/diceActivations/helpers', () => ({
    getDiceSequentialActivationStats: vi.fn(() => (mockActivationStatsResult))
}));


describe('pushYourLuck logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'pushYourLuck';
    const food: Food = 'Fish';
    const dieCount: number = 1;
    const rollCount: number = 2;

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('calls getDiceSequentialActivationStats', () => {
        pushYourLuckLogic(baseGameDie, food, dieCount, rollCount);

        expect(getDiceSequentialActivationStats).toHaveBeenCalledWith(
            activationName,
            baseGameDie,
            food,
            dieCount,
            rollCount
        );
    });
})

describe('getPushYourLuckActivation', () => {
    it('return correct activation structure and contents for each bird (specifics mocked)', () => {


        vi.spyOn(diceActivationLogic, 'pushYourLuckLogic').mockImplementation(() => mockActivationStatsResult);

        const testBirds: DiceActivationInput[] = [
            { birdName: 'Brahminy Kite', targetFood: ['Fish', 'Rodent'], dieCount: 3, rollCount: 3, activationResultMode: 'sequential' },
            { birdName: 'Forest Owlet', targetFood: ['Invertebrate', 'Rodent'], dieCount: 2, rollCount: 3, activationResultMode: 'sequential' },
        ];

        const results = getPushYourLuckActivation(testBirds);

        expect(results).toHaveLength(testBirds.length);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const expectedBird = testBirds[i];

            expect(result.birdName).toBe(expectedBird.birdName);
            expect(result.targetFood).toEqual(expectedBird.targetFood);
            expect(result.die).toBe(baseGameDie.version);
            expect(result.dieCount).toBe(expectedBird.dieCount);
            expect(result.rollCount).toBe(expectedBird.rollCount);
            expect(result.activationResultMode).toBe(expectedBird.activationResultMode);

            expect(Object.keys(result.activationStats)).toHaveLength(result.rollCount);
        }
    });
});
