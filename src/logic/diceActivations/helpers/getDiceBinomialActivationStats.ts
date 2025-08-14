import type { DiceActivations, Die, Food, ActivationStats } from '@customTypes';
import { DieLogic } from '@logic/dieLogic';
import { binomialCoefficient } from '@logic/utils/binomialCoefficient';
import { getExactMatchExcludingTargetOdds } from '@logic/diceActivations/helpers/exactMatchOdds'


function applyBinomialReroll(
    die: Die,
    targetFood: Food | Food[],
    dieCount: number,
    activationStats: ActivationStats
): ActivationStats {
    const rerollProb = getExactMatchExcludingTargetOdds(die, targetFood, dieCount);

    // adjustment scale due to reroll recursion-until-success-or-fail
    const scale = 1 / (1 - rerollProb);

    // apply to all
    let adjustedDistribution = Object.fromEntries(
        Object.entries(activationStats.distribution).map(([k, v]) => [Number(k), v * scale])
    );

    const adjustedExpectedValue = activationStats.expectedValue * scale;
    const adjustedAnySuccess = activationStats.anySuccess * scale;
    const adjustedFailure = 1 - adjustedAnySuccess
    // special-case, as rerolling is recursive, can just apply scale to failure once
    adjustedDistribution[0] = adjustedFailure;

    const adjustedActivationStats: ActivationStats = {
        activationName: activationStats.activationName,
        distribution: adjustedDistribution,
        anySuccess: adjustedAnySuccess,
        failure: adjustedFailure,
        expectedValue: adjustedExpectedValue,
    };

    return adjustedActivationStats;
}

export function getDiceBinomialActivationStats(
    activationName: DiceActivations,
    die: Die,
    targetFood: Food | Food[],
    dieCount: number,
    permitReroll: boolean = false
): ActivationStats {
    // Binomial Activation, the total number of success is detailed along with a singular EV (expected value)
    const singleSuccessProb = DieLogic.getFoodOdds(die, targetFood);
    const distribution: Record<number, number> = {};
    let expectedValue: number = 0;

    for (let k = 0; k <= dieCount; k++) {
        const combinations = binomialCoefficient(dieCount, k);
        const prob = combinations *
            Math.pow(singleSuccessProb, k) *
            Math.pow(1 - singleSuccessProb, dieCount - k);

        distribution[k] = prob;
        expectedValue += k * prob;
    }

    const failure: number = distribution[0]

    const activationStats: ActivationStats = {
        activationName: activationName,
        distribution: distribution,
        anySuccess: 1 - failure,
        failure: failure,
        expectedValue: expectedValue,
    };

    if (permitReroll) {
        return applyBinomialReroll(die, targetFood, dieCount, activationStats)
    }

    return activationStats
}
