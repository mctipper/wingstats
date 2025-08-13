import type { DiceActivations, Die, Food, ActivationResultMode, ActivationStats } from '@customTypes';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';

export function rollDiceNotInTheBirdfeederLogic(
    die: Die,
    targetFood: Food | Food[],
    rollCount: number,
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'roll dice not in the birdfeeder' style activation
    if (rollCount >= 5) throw new Error('Cannot activate with > 4 dice');
    const activationName: DiceActivations = 'rollDiceNotInTheBirdfeeder';
    const permitReroll: boolean = false;
    return activationResultMode === 'binary'
        ? getDiceBinaryActivationStats(activationName, die, targetFood, rollCount, permitReroll)
        : getDiceBinomialActivationStats(activationName, die, targetFood, rollCount, permitReroll);
}
