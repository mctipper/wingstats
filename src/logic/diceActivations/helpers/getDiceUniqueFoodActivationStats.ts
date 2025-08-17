import type { DiceActivations, Die, Food, ActivationStats } from '@customTypes';
import { getAllSubsets } from '@logic/utils/getAllSubsets';
import { DieLogic } from '@logic/dieLogic';


export function getDiceUniqueFoodActivationStats(
    activationName: DiceActivations,
    die: Die,
    dieCount: number
): ActivationStats {
    const allFoods = DieLogic.getAllUniqueFoodsOnDie(die);
    let foodSeenProb: Record<Food, number> = {} as Record<Food, number>

    // build out probability of landing each unique food
    for (const food of allFoods) {
        const p = DieLogic.getFoodOdds(die, food);
        foodSeenProb[food] = 1 - Math.pow(1 - p, dieCount);
    }

    let rawDistribution: Record<number, number> = {};

    const subsets: Food[][] = getAllSubsets(allFoods);

    for (const subset of subsets) {
        const included = new Set(subset);
        const excluded = allFoods.filter(f => !included.has(f));

        let prob = 1;
        for (const food of included) {
            prob *= foodSeenProb[food];
        }
        for (const food of excluded) {
            prob *= 1 - foodSeenProb[food];
        }

        const uniqueCount = subset.length;

        rawDistribution[uniqueCount] = (rawDistribution[uniqueCount] ?? 0) + prob;
    }

    // normalise due to composition errors in repeated small multiplication
    const totalProb = Object.values(rawDistribution).reduce((sum, p) => sum + p, 0);
    const distribution: Record<number, number> = {};
    for (const key in rawDistribution) {
        distribution[+key] = rawDistribution[+key] / totalProb;
    }

    // calc after normalising results
    let expectedValue = 0;
    let anySuccess = 0;
    for (const [countStr, prob] of Object.entries(distribution)) {
        const count = +countStr;
        expectedValue += count * prob;
        anySuccess += prob;
    }


    return {
        activationName,
        distribution,
        anySuccess,
        failure: 1 - anySuccess,
        expectedValue
    };
}
