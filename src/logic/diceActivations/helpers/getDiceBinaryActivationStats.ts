import type { DiceActivations, Die, Food, ActivationStats } from '@customTypes';
import { DieLogic } from '@logic/die';
import { getExactMatchExcludingTargetOdds } from '@logic/diceActivations/helpers/exactMatchOdds';


function applyBinaryReroll(
    die: Die,
    targetFood: Food | Food[],
    rollCount: number,
    activationStats: ActivationStats
): ActivationStats {
    const rerollProb = getExactMatchExcludingTargetOdds(die, targetFood, rollCount)
    activationStats.anySuccess = activationStats.anySuccess / (1 - rerollProb);
    activationStats.expectedValue = activationStats.anySuccess;
    activationStats.failure = 1 - activationStats.anySuccess;
    activationStats.distribution = {
        0: activationStats.failure,
        1: activationStats.anySuccess
    }
    return activationStats
}

export function getDiceBinaryActivationStats(
    activationName: DiceActivations,
    die: Die,
    targetFood: Food | Food[],
    rollCount: number,
    permitReroll: boolean = false
): ActivationStats {
    // Binary Activation, any number of success is counted as 1
    const singleSuccessProb = DieLogic.getFoodOdds(die, targetFood);
    const failure = Math.pow(1 - singleSuccessProb, rollCount);
    const anySuccess = 1 - failure;

    const activationStats: ActivationStats = {
        activationName: activationName,
        distribution: {
            0: failure,
            1: anySuccess,
        },
        anySuccess: anySuccess,
        failure: failure,
        expectedValue: anySuccess,
    }

    if (permitReroll) {
        return applyBinaryReroll(die, targetFood, rollCount, activationStats)
    }

    return activationStats
}
