import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rollDiceForXBirdsInHabitatLogic, getRollDiceForXBirdsInHabitiatActivation } from '../rollDiceForXBirdsInHabitat';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import type { DiceActivations, Food, ActivationStats, DiceActivationInput } from '@customTypes';
import * as diceActvationLogic from '@logic/diceActivations/rollDiceForXBirdsInHabitat';
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


describe('rollDiceForXBirdsInHabitat logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'rollDiceForXBirdsInHabitat'
    const food: Food = 'Fish';
    const rollCount: number = 3;
    const permitReroll: boolean = false;

    it('calls getDiceBinaryActivationStats when mode is "binary"', () => {
        rollDiceForXBirdsInHabitatLogic(baseGameDie, food, rollCount, 'binary');

        expect(getDiceBinaryActivationStats).toHaveBeenCalledWith(activationName, baseGameDie, food, rollCount, permitReroll);
        expect(getDiceBinomialActivationStats).not.toHaveBeenCalled();
    });

    it('calls getDiceBinomialActivationStats when mode is "binomial"', () => {
        rollDiceForXBirdsInHabitatLogic(baseGameDie, food, rollCount, 'binomial');

        expect(getDiceBinomialActivationStats).toHaveBeenCalledWith(activationName, baseGameDie, food, rollCount, permitReroll);
        expect(getDiceBinaryActivationStats).not.toHaveBeenCalled();
    });
});


describe('getRollDiceNotInTheBirdfeederActivation', () => {
    it('return correct activation structure and contents for each bird (specifics mocked)', () => {
        vi.spyOn(diceActvationLogic, 'rollDiceForXBirdsInHabitatLogic')
            .mockImplementation(() => mockActivationStatsResult);

        const testBirds: DiceActivationInput[] = [
            { birdName: 'Stork-Billed Kingfisher', targetFood: 'Fish', dieCount: 1, rollCount: 5, activationResultMode: 'binary' },
            { birdName: 'Stork-Billed Kingfisher Binomial', targetFood: 'Fish', dieCount: 1, rollCount: 5, activationResultMode: 'binomial' },
            { birdName: 'Mock Bird', targetFood: ['Rodent', 'Fish'], dieCount: 1, rollCount: 5, activationResultMode: 'binary' },
            { birdName: 'Mock Bird Junior', targetFood: ['Invertebrate', 'Seed'], dieCount: 1, rollCount: 5, activationResultMode: 'binomial' },
        ]

        const results = getRollDiceForXBirdsInHabitiatActivation(testBirds);

        expect(results).toHaveLength(testBirds.length);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const expectedBird = testBirds[i];

            expect(result.birdName).toBe(expectedBird.birdName);
            expect(result.targetFood).toBe(expectedBird.targetFood);
            expect(result.dieCount).toBe(expectedBird.dieCount);
            expect(result.rollCount).toBe(expectedBird.rollCount);
            expect(result.activationResultMode).toBe(expectedBird.activationResultMode);

            expect(Object.keys(result.activationStats)).toHaveLength(expectedBird.rollCount);
        }
    });

    it('throw when dieCount > 1', () => {
        // currently not configured to except Y dice for X birds, this is a TODO should such activation be designed, purpose throw here to prevent future mistakes
        const errorBird: DiceActivationInput[] = [
            { birdName: 'MultiDice Bird', targetFood: 'Fish', dieCount: 2, rollCount: 5, activationResultMode: 'binary' },
        ]
        expect(() => {
            getRollDiceForXBirdsInHabitiatActivation(errorBird);
        }).toThrow();
    });
});
