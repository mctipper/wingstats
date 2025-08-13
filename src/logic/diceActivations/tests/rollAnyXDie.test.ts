import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rollAnyXDice } from '@logic/diceActivations/rollAnyXDie'
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

describe('rollAnyXDice', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'rollAnyXDice'
    const food: Food = 'Fish';
    const rollCount: number = 5;
    const permitReroll: boolean = false;

    it('calls getDiceBinaryActivationStats when mode is "binary"', () => {
        rollAnyXDice(oceaniaDie, food, rollCount, 'binary');

        expect(getDiceBinaryActivationStats).toHaveBeenCalledWith(activationName, oceaniaDie, food, rollCount, permitReroll);
        expect(getDiceBinomialActivationStats).not.toHaveBeenCalled();
    });

    it('calls getDiceBinomialActivationStats when mode is "binomial"', () => {
        rollAnyXDice(oceaniaDie, food, rollCount, 'binomial');

        expect(getDiceBinomialActivationStats).toHaveBeenCalledWith(activationName, oceaniaDie, food, rollCount, permitReroll);
        expect(getDiceBinaryActivationStats).not.toHaveBeenCalled();
    });
});
