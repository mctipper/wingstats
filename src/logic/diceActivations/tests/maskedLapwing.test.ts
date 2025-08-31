import { describe, it, expect, vi, beforeEach } from 'vitest';
import { maskedLapwingLogic, getMaskedLapwingActivation } from '@logic/diceActivations/maskedLapwing'
import { getDiceUniqueFoodActivationStats } from '@logic/diceActivations/helpers';
import type { DiceActivations, Die, ActivationStats, DiceActivationInput } from '@customTypes';
import * as diceActvationLogic from '@logic/diceActivations/maskedLapwing';
import { allDice } from '@definitions/diceDefinitions';



const mockActivationStatsResult: ActivationStats = {
    activationName: '__TEST__',
    distribution: { 0: 0.1, 1: 0.9 },
    anySuccess: 0.9,
    failure: 0.1,
    expectedValue: 0.9,
};

vi.mock('@logic/diceActivations/helpers', () => ({
    getDiceUniqueFoodActivationStats: vi.fn(() => (mockActivationStatsResult))
}));


describe('maskedLapwing logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'maskedLapwing'
    const die: Die = allDice.basegame;
    const dieCount: number = 3;

    it('calls getDiceUniqueFoodActivationStats"', () => {
        maskedLapwingLogic(die, dieCount);

        expect(getDiceUniqueFoodActivationStats).toHaveBeenCalledWith(activationName, die, dieCount);
    });

});


describe('getMaskedLapwingActivation', () => {
    it('return correct activation structure and contents for each bird (specifics mocked)', () => {
        vi.spyOn(diceActvationLogic, 'maskedLapwingLogic')
            .mockImplementation(() => mockActivationStatsResult);

        const testBirds: DiceActivationInput[] = [
            { birdName: 'Masked Lapwing', targetFood: ['Fish', 'Fruit', 'Invertebrate', 'Nectar', 'Rodent', 'Seed'], dieCount: 5, rollCount: 1, activationResultMode: 'uniques' },
        ];

        const results = getMaskedLapwingActivation(testBirds);

        for (const [_dieVersion, curDie] of Object.entries(allDice)) {
            const result = results[0];
            const expectedBird = testBirds[0];
            // let curDie: Die
            expect(result.birdName).toBe(expectedBird.birdName);
            expect(result.targetFood).toBe(expectedBird.targetFood);
            expect(result.dieCount).toBe(expectedBird.dieCount);
            expect(result.rollCount).toBe(expectedBird.rollCount);
            expect(result.activationResultMode).toBe(expectedBird.activationResultMode);

            // one result only pls
            expect(Object.keys(result.activationStats)).toHaveLength(2);
            expect(result.activationStats[curDie.version]).toEqual(mockActivationStatsResult);
        }
    });
});
