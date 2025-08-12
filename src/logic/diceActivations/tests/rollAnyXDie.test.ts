import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RollAnyXDice } from '@logic/diceActivations/rollAnyXDie'
import { getDiceBinaryActivationStats } from '@logic/diceActivations/getDiceBinaryActivationStats';
import { getDiceBinomialActivationStats } from '@logic/diceActivations/getDiceBinomialActivationStats';
import type { Food } from '@customTypes';
import { oceaniaDie } from '@definitions/diceDefinitions';

// enable spying
vi.mock('@logic/diceActivations/getDiceBinaryActivationStats', () => ({
    getDiceBinaryActivationStats: vi.fn(() => ({ mode: 'binary' })),
}));

vi.mock('@logic/diceActivations/getDiceBinomialActivationStats', () => ({
    getDiceBinomialActivationStats: vi.fn(() => ({ mode: 'binomial' })),
}));

describe('RollAnyXDice', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const food: Food = 'Fish';
    const rollCount: number = 5;

    it('calls getDiceBinaryActivationStats when mode is "binary"', () => {
        RollAnyXDice(oceaniaDie, food, rollCount, 'binary');

        expect(getDiceBinaryActivationStats).toHaveBeenCalledWith(oceaniaDie, food, rollCount);
        expect(getDiceBinomialActivationStats).not.toHaveBeenCalled();
    });

    it('calls getDiceBinomialActivationStats when mode is "binomial"', () => {
        RollAnyXDice(oceaniaDie, food, rollCount, 'binomial');

        expect(getDiceBinomialActivationStats).toHaveBeenCalledWith(oceaniaDie, food, rollCount);
        expect(getDiceBinaryActivationStats).not.toHaveBeenCalled();
    });
});
