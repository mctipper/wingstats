import type { DiceActivations, Die, Food, ActivationStats } from '@customTypes';
import { DieLogic } from '@logic/dieLogic';


export function getDiceSequentialActivationStats(
    activationName: DiceActivations,
    die: Die,
    targetFood: Food | Food[],
    dieCount: number,
    rollCount: number,
): ActivationStats {
    // prob single-success per round
    const p = DieLogic.getFoodOdds(die, targetFood);
    const roundSuccessProb = 1 - Math.pow(1 - p, dieCount);

    // prob ^ rolls provides probability of reaching success for this tactic
    const fullStreakProb = Math.pow(roundSuccessProb, rollCount);
    const failure = 1 - fullStreakProb;
    const expectedValue = rollCount * fullStreakProb;
    const distribution: Record<number, number> = {
        0: failure,
        [rollCount]: fullStreakProb,
    };

    return {
        activationName,
        distribution,
        anySuccess: fullStreakProb,
        failure,
        expectedValue,
    };
}