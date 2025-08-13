import { describe, it, expect, vi } from 'vitest';
import { getRollAnyXDiceBirdActivations } from '@computed/diceActivations/rollAnyXDieActivation'
import * as diceActvationLogic from '@logic/diceActivations/rollAnyXDieLogic';
import type { ActivationStats, DiceActivationInput } from '@customTypes';

describe('getRollAnyXDiceBirdActivations', () => {
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
        vi.spyOn(diceActvationLogic, 'rollAnyXDiceLogic').mockImplementation(() => mockActivationStatsResult as ActivationStats);

        const testBirds: DiceActivationInput[] = [
            { birdName: 'Eurasian Kestrel', targetFood: 'Rodent', rollCount: 3, activationResultMode: 'binary' },
            { birdName: 'Great Cormorant', targetFood: 'Fish', rollCount: 2, activationResultMode: 'binary' },
        ];

        const results = getRollAnyXDiceBirdActivations(testBirds);

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