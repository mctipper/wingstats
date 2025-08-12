import type { Die, Food, ActivationResultMode, ActivationStats } from '@customTypes';
import { getDiceBinaryActivationStats } from '@logic/diceActivations/getDiceBinaryActivationStats';
import { getDiceBinomialActivationStats } from '@logic/diceActivations/getDiceBinomialActivationStats';

export function rollAnyXDice(
    die: Die,
    targetFood: Food | Food[],
    rollCount: number,
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'roll any x dice' style activation
    return activationResultMode === 'binary'
        ? getDiceBinaryActivationStats(die, targetFood, rollCount)
        : getDiceBinomialActivationStats(die, targetFood, rollCount);
}
