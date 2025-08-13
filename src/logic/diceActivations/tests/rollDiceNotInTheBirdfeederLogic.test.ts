import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rollDiceNotInTheBirdfeederLogic } from '@logic/diceActivations/rollDiceNotInTheBirdfeederLogic'
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import type { DiceActivations, Food } from '@customTypes';
import { oceaniaDie } from '@definitions/diceDefinitions';

// enable spying
vi.mock('@logic/diceActivations/helpers/getDiceBinaryActivationStats', () => ({
    getDiceBinaryActivationStats: vi.fn(() => ({ mode: 'binary' })),
}));

vi.mock('@logic/diceActivations/helpers/getDiceBinomialActivationStats', () => ({
    getDiceBinomialActivationStats: vi.fn(() => ({ mode: 'binomial' })),
}));

describe('rollDiceNotInTheBirdfeeder logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'rollDiceNotInTheBirdfeeder'
    const food: Food = 'Fish';
    const rollCount: number = 3;
    const permitReroll: boolean = false;

    it('throw when rollCount > 4', () => {
        const invalidRollCounts: number[] = [5, 6, 1000];
        for (const ivc of invalidRollCounts) {
            expect(() => {
                rollDiceNotInTheBirdfeederLogic(oceaniaDie, food, ivc, 'binomial');
            }).toThrow();
        }
    });

    it('calls getDiceBinaryActivationStats when mode is "binary"', () => {
        rollDiceNotInTheBirdfeederLogic(oceaniaDie, food, rollCount, 'binary');

        expect(getDiceBinaryActivationStats).toHaveBeenCalledWith(activationName, oceaniaDie, food, rollCount, permitReroll);
        expect(getDiceBinomialActivationStats).not.toHaveBeenCalled();
    });

    it('calls getDiceBinomialActivationStats when mode is "binomial"', () => {
        rollDiceNotInTheBirdfeederLogic(oceaniaDie, food, rollCount, 'binomial');

        expect(getDiceBinomialActivationStats).toHaveBeenCalledWith(activationName, oceaniaDie, food, rollCount, permitReroll);
        expect(getDiceBinaryActivationStats).not.toHaveBeenCalled();
    });
});
