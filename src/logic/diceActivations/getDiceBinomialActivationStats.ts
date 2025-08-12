import type { Die, Food, ActivationStats } from '@customTypes';
import { DieLogic } from '@logic/die';
import { binomialCoefficient } from '@logic/binomialCoefficient';



export function getBinomialActivationStats(
    die: Die,
    targetFood: Food | Food[],
    rollCount: number
): ActivationStats {
    // Binomial Activation, the total number of success is counted
    const singleSuccessProb = DieLogic.getFoodOdds(die, targetFood);
    const distribution: Record<number, number> = {};
    let expectedValue: number = 0;

    for (let k = 0; k <= rollCount; k++) {
        const combinations = binomialCoefficient(rollCount, k);
        const prob = combinations *
            Math.pow(singleSuccessProb, k) *
            Math.pow(1 - singleSuccessProb, rollCount - k);

        distribution[k] = prob;
        expectedValue += k * prob;
    }

    const failure = distribution[0] ?? 0;
    const anySuccess = 1 - failure;

    return {
        distribution,
        anySuccess,
        failure,
        expectedValue,
    };
}
