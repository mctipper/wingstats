import { describe, it, expect, vi } from 'vitest';
import { getResetTheBirdfeederActivations } from '@computed/diceActivations/resetTheBirdfeeder'
import * as diceActvationLogic from '@logic/diceActivations/resetTheBirdfeeder';
import type { ActivationStats } from '@customTypes';

describe('getResetTheBirdfeederActivations', () => {
    it('should return correct activation results for each bird', () => {
        // mock rollAnyXDice to return predictable stats
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
        vi.spyOn(diceActvationLogic, 'resetTheBirdfeeder').mockImplementation(() => mockActivationStatsResult as ActivationStats);

        const results = getResetTheBirdfeederActivations();

        for (const result of results) {
            expect(result.birdName).toBeTypeOf('string');
            Array.isArray(result.targetFood) ? result.targetFood.every(f => expect(f).toBeTypeOf('string')) : expect(result.targetFood).toBeTypeOf('string');
            expect(result.rollCount).toBeTypeOf('number');
            expect(result.activationStats).toEqual(mockActivationStatsResult);
        }
    });
});

