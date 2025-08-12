import type { Die, Food, ActivationStats } from '@customTypes';
import { DieLogic } from '@logic/die';


function binomialCoefficient(n: number, k: number): number {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;

    let coeff = 1;
    for (let i = 1; i <= k; i++) {
        coeff *= (n - i + 1) / i;
    }
    return coeff;
}

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
