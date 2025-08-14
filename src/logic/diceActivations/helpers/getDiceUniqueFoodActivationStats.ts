import type { DiceActivations, Die, Food, ActivationStats } from '@customTypes';
import { DieLogic } from '@logic/dieLogic';


function getAllCombinations<T>(items: T[]): T[][] {
    const result: T[][] = [];
    const total = 1 << items.length;

    for (let mask = 0; mask < total; mask++) {
        const subset: T[] = [];
        for (let i = 0; i < items.length; i++) {
            if (mask & (1 << i)) subset.push(items[i]);
        }
        result.push(subset);
    }

    return result;
}

export function getDiceUniqueFoodActivationStats(
    activationName: DiceActivations,
    die: Die,
    dieCount: number
): ActivationStats {
    const allFoods = DieLogic.allFoodsOnDie(die);
    let foodSeenProb: Record<Food, number> = {} as Record<Food, number>

    // build out probability of landing each unique food
    for (const food of allFoods) {
        const p = DieLogic.getFoodOdds(die, food);
        foodSeenProb[food] = 1 - Math.pow(1 - p, dieCount);
    }

    let distribution: Record<number, number> = {};
    let expectedValue: number = 0

    const subsets = getAllCombinations(allFoods);

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
        distribution[uniqueCount] = (distribution[uniqueCount] ?? 0) + prob;
        expectedValue += uniqueCount * prob;
    }

    return {
        activationName,
        distribution,
        anySuccess: 1,
        failure: 0,
        expectedValue
    };
}
