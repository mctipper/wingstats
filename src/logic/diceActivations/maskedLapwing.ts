import type { DiceActivations, Die, ActivationStats, DiceActivationInput, DiceActivationResult } from '@customTypes';
import { getDiceUniqueFoodActivationStats } from '@logic/diceActivations/helpers';
import { allDice } from '@definitions/diceDefinitions';

// yeah this is a bit redundant, keeping the same pattern as others though...
export const birdsMaskedLapwing: DiceActivationInput[] = [
    { birdName: 'Masked Lapwing', targetFood: ['Fish', 'Fruit', 'Invertebrate', 'Nectar', 'Rodent', 'Seed'], dieCount: 5, rollCount: 1, activationResultMode: 'uniques' },
]


export function maskedLapwingLogic(
    die: Die,
    dieCount: number,
): ActivationStats {
    // wrapper function to explicitly call the 'masked lapwing' style activation
    const activationName: DiceActivations = 'maskedLapwing';
    return getDiceUniqueFoodActivationStats(activationName, die, dieCount)
}


export function getMaskedLapwingActivation(birdsMaskedLapwing: DiceActivationInput[]): DiceActivationResult[] {
    let allBirdStats: DiceActivationResult[] = []
    for (const curBird of birdsMaskedLapwing) {
        const activationStats: Record<string, ActivationStats> = {};
        for (const curDie of Object.values(allDice)) {
            activationStats[curDie.version] = maskedLapwingLogic(curDie, curBird.dieCount)
        }

        const result: DiceActivationResult = {
            birdName: curBird.birdName,
            targetFood: curBird.targetFood,
            dieCount: curBird.dieCount,
            rollCount: curBird.rollCount,
            activationResultMode: curBird.activationResultMode,
            activationStats: activationStats
        }

        allBirdStats.push(result);
    }

    return allBirdStats
}
