import { describe, it, expect, vi } from 'vitest';
import { getRollDiceNotInTheBirdfeederActivation } from '@computed/diceActivations/rollDiceNotInTheBirdfeederActivation';
import * as diceActvationLogic from '@logic/diceActivations/rollDiceNotInTheBirdfeederLogic';
import type { ActivationStats, DiceActivationInput } from '@customTypes';

describe('getRollDiceNotInTheBirdfeederActivation', () => {
    it('should return correct activation results for each bird using real data', () => {
        const mockActivationStatsResult: ActivationStats = {
            activationName: '__TEST__',
            distribution: { 0: 0.1, 1: 0.9 },
            anySuccess: 0.9,
            failure: 0.1,
            expectedValue: 0.9
        };

        vi.spyOn(diceActvationLogic, 'rollDiceNotInTheBirdfeederLogic')
            .mockImplementation(() => mockActivationStatsResult);

        const testBirds: DiceActivationInput[] = [
            { birdName: 'Mississippi Kite', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
            { birdName: 'Northern Gannet', targetFood: 'Fish', rollCount: 4, activationResultMode: 'binomial' },
        ];

        const results = getRollDiceNotInTheBirdfeederActivation(testBirds);

        expect(results).toHaveLength(testBirds.length);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const expectedBird = testBirds[i];

            expect(result.birdName).toBe(expectedBird.birdName);
            expect(result.targetFood).toBe(expectedBird.targetFood);
            expect(result.rollCount).toBe(expectedBird.rollCount);
            expect(result.activationResultMode).toBe(expectedBird.activationResultMode);

            expect(Object.keys(result.activationStats)).toHaveLength(expectedBird.rollCount);
            // start at 1 to indicate '1 dice not in the birdfeeder'
            for (let j = 1; j < expectedBird.rollCount; j++) {
                expect(result.activationStats[j]).toEqual(mockActivationStatsResult);
            }
        }
    });
});
