import type { Die, Food, ActivationStats } from '@customTypes';
import { DieLogic } from '@logic/die';

export function getBinaryActivationStats(
    die: Die,
    targetFood: Food | Food[],
    rollCount: number
): ActivationStats {
    // Binary Activation, any number of success is counted as 1
    const singleSuccessProb = DieLogic.getFoodOdds(die, targetFood);
    const failure = Math.pow(1 - singleSuccessProb, rollCount);
    const anySuccess = 1 - failure;

    return {
        distribution: {
            0: failure,
            1: anySuccess,
        },
        anySuccess,
        failure,
        expectedValue: anySuccess,
    };
}
