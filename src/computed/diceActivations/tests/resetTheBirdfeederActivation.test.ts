import { describe, it, expect, vi } from 'vitest';
import { getResetTheBirdfeederActivations } from '@computed/diceActivations/resetTheBirdfeederActivation'
import * as diceActvationLogic from '@logic/diceActivations/resetTheBirdfeederLogic';
import type { ActivationStats, DiceActivationInput } from '@customTypes';

describe('getResetTheBirdfeederActivations', () => {
    it('should return correct activation results for each bird', () => {

        const mockActivationStatsResult: ActivationStats = {
            activationName: '__TEST__',
            distribution: {
                0: 0.1,
                1: 0.9
            },
            anySuccess: 0.9,
            failure: 0.1,
            expectedValue: 0.9
        }
        vi.spyOn(diceActvationLogic, 'resetTheBirdfeederLogic').mockImplementation(() => mockActivationStatsResult as ActivationStats);

        const rollCount: number = 5
        const testBirds: DiceActivationInput[] = [
            { birdName: 'Grey Shrikethrush', targetFood: 'Rodent', rollCount: rollCount, activationResultMode: 'binomial' },
            { birdName: 'Hawfinch', targetFood: 'Seed', rollCount: rollCount, activationResultMode: 'binary' },
            { birdName: 'Laughing Kookaburra', targetFood: ['Fish', 'Invertebrate', 'Rodent'], rollCount: rollCount, activationResultMode: 'binary' },
        ];

        const results = getResetTheBirdfeederActivations(testBirds);

        expect(results).toHaveLength(testBirds.length);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const expectedBird = testBirds[i];

            expect(result.birdName).toBe(expectedBird.birdName);
            expect(result.targetFood).toBe(expectedBird.targetFood);
            expect(result.rollCount).toBe(expectedBird.rollCount);
            expect(result.activationResultMode).toBe(expectedBird.activationResultMode);

            // one result only pls
            expect(Object.keys(result.activationStats)).toHaveLength(1);
            expect(result.activationStats[0]).toEqual(mockActivationStatsResult);
        }
    }
    )
})