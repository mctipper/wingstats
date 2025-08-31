import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resetTheBirdfeederLogic, getResetTheBirdfeederActivations } from '@logic/diceActivations/resetTheBirdfeeder';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import type { ActivationStats, DiceActivations, DiceActivationInput, Food } from '@customTypes';
import { baseGameDie } from '@definitions/diceDefinitions';
import * as diceActivationLogic from '@logic/diceActivations/resetTheBirdfeeder';


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


describe('resetTheBirdfeeder logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'resetTheBirdfeeder';
    const food: Food = 'Fish';
    const dieCount: number = 5;
    const permitReroll = true;

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('calls getDiceBinaryActivationStats when mode is "binary"', () => {
        resetTheBirdfeederLogic(baseGameDie, food, 'binary');

        expect(getDiceBinaryActivationStats).toHaveBeenCalledWith(
            activationName,
            baseGameDie,
            food,
            dieCount,
            permitReroll
        );
        expect(getDiceBinomialActivationStats).not.toHaveBeenCalled();
    });

    it('calls getDiceBinomialActivationStats when mode is "binomial"', () => {
        resetTheBirdfeederLogic(baseGameDie, food, 'binomial');

        expect(getDiceBinomialActivationStats).toHaveBeenCalledWith(
            activationName,
            baseGameDie,
            food,
            dieCount,
            permitReroll
        );
        expect(getDiceBinaryActivationStats).not.toHaveBeenCalled();
    });
});

describe('getResetTheBirdfeederActivations', () => {
    it('return correct activation structure and contents for each bird (specifics mocked)', () => {


        vi.spyOn(diceActivationLogic, 'resetTheBirdfeederLogic').mockImplementation(() => mockActivationStatsResult);

        const dieCount: number = 5;
        const rollCount: number = 1;
        const testBirds: DiceActivationInput[] = [
            { birdName: 'Grey Shrikethrush', targetFood: 'Rodent', dieCount, rollCount, activationResultMode: 'binomial' },
            { birdName: 'Hawfinch', targetFood: 'Seed', dieCount, rollCount, activationResultMode: 'binary' },
            { birdName: 'Laughing Kookaburra', targetFood: ['Fish', 'Invertebrate', 'Rodent'], dieCount, rollCount, activationResultMode: 'binary' },
        ];

        const results = getResetTheBirdfeederActivations(testBirds);

        expect(results).toHaveLength(testBirds.length);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const expectedBird = testBirds[i];

            expect(result.birdName).toBe(expectedBird.birdName);
            expect(result.targetFood).toEqual(expectedBird.targetFood);
            expect(result.dieCount).toBe(expectedBird.dieCount);
            expect(result.rollCount).toBe(expectedBird.rollCount);
            expect(result.activationResultMode).toBe(expectedBird.activationResultMode);

            // one result only pls
            expect(Object.keys(result.activationStats)).toHaveLength(1);
            expect(result.activationStats[0]).toEqual(mockActivationStatsResult);
        }
    });
});
