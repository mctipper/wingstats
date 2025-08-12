import type { Die, Food, ActivationResultMode, ActivationStats } from '@customTypes';
import { getBinaryActivationStats } from '@logic/activations/getBinaryActivationStats';
import { getBinomialActivationStats } from '@logic/activations/getBinomialActivationStats';

export function RollAnyXDice(
    die: Die,
    targetFood: Food | Food[],
    rollCount: number,
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'roll any x dice' style activation
    return activationResultMode === 'binary'
        ? getBinaryActivationStats(die, targetFood, rollCount)
        : getBinomialActivationStats(die, targetFood, rollCount);
}
