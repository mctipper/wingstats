import type { DiceActivations, Die, Food, ActivationResultMode, ActivationStats } from '@customTypes';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';

export function resetTheBirdfeeder(
    die: Die,
    targetFood: Food | Food[],
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'reset the birdfeeder' style activation
    const activationName: DiceActivations = 'resetTheBirdfeeder'
    const rollCount: number = 5
    const permitReroll: boolean = true
    return activationResultMode === 'binary'
        ? getDiceBinaryActivationStats(activationName, die, targetFood, rollCount, permitReroll)
        : getDiceBinomialActivationStats(activationName, die, targetFood, rollCount, permitReroll);
}
