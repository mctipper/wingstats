import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resetTheBirdfeeder } from '@logic/diceActivations/resetTheBirdfeeder'
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

describe('resetTheBirdfeeder logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const activationName: DiceActivations = 'resetTheBirdfeeder'
    const food: Food = 'Fish';
    const rollCount: number = 5;
    const permitReroll: boolean = true;

    it('calls getDiceBinaryActivationStats when mode is "binary"', () => {
        resetTheBirdfeeder(oceaniaDie, food, 'binary');

        expect(getDiceBinaryActivationStats).toHaveBeenCalledWith(activationName, oceaniaDie, food, rollCount, permitReroll);
        expect(getDiceBinomialActivationStats).not.toHaveBeenCalled();
    });

    it('calls getDiceBinomialActivationStats when mode is "binomial"', () => {
        resetTheBirdfeeder(oceaniaDie, food, 'binomial');

        expect(getDiceBinomialActivationStats).toHaveBeenCalledWith(activationName, oceaniaDie, food, rollCount, permitReroll);
        expect(getDiceBinaryActivationStats).not.toHaveBeenCalled();
    });
});
