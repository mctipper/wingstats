import type { DiceActivations, Die, Food, ActivationStats } from '@customTypes';
import { DieLogic } from '@logic/dieLogic';
import { binomialCoefficient } from '@logic/utils/binomialCoefficient';

export function getDiceWithholdingActivationStats(
    activationName: DiceActivations,
    die: Die,
    targetFood: Food | Food[],
    dieCount: number,
    rollCount: number,
): ActivationStats {
    const p = DieLogic.getFoodOdds(die, targetFood);
    const perDieSuccess = 1 - Math.pow(1 - p, rollCount);

    let anySuccess = 0;
    for (let k = 3; k <= dieCount; k++) {
        const prob =
            binomialCoefficient(dieCount, k) *
            Math.pow(perDieSuccess, k) *
            Math.pow(1 - perDieSuccess, dieCount - k);
        anySuccess += prob;
    }

    const failure = 1 - anySuccess;
    const expectedValue = anySuccess;

    const distribution: Record<number, number> = {
        0: failure,
        1: anySuccess,
    };

    return {
        activationName,
        distribution,
        anySuccess,
        failure,
        expectedValue,
    };
}