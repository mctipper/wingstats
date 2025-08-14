import type { DiceActivations, Die, Food, ActivationResultMode, ActivationStats, DiceActivationInput, DiceActivationResult } from '@customTypes';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import { baseGameDie } from '@definitions/diceDefinitions';



export const birdsRollDiceForXBirdsInHabitiat: DiceActivationInput[] = [
    { birdName: 'Stork-Billed Kingfisher', targetFood: 'Fish', dieCount: 1, rollCount: 5, activationResultMode: 'binary' }
]


export function rollDiceForXBirdsInHabitatLogic(
    die: Die,
    targetFood: Food | Food[],
    rollCount: number,
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'roll dice for x birds in habitat' style activation
    const activationName: DiceActivations = 'rollDiceForXBirdsInHabitat';
    const permitReroll: boolean = false;
    return activationResultMode === 'binary'
        // using rollCount _as_ dieCount as Y dice rolled for X rolls not implemented (nor required).
        // this simply inverts the logic with equality (rolling 5 die once === rolling 1 die 5 times)
        ? getDiceBinaryActivationStats(activationName, die, targetFood, rollCount, permitReroll)
        : getDiceBinomialActivationStats(activationName, die, targetFood, rollCount, permitReroll);
}


export function getRollDiceForXBirdsInHabitiatActivation(birdsRollDiceForXBirdsInHabitiat: DiceActivationInput[]): DiceActivationResult[] {
    let allBirdStats: DiceActivationResult[] = []
    for (let curBird of birdsRollDiceForXBirdsInHabitiat) {
        // EXCEPTION, currently not configured to except Y dice for X birds, this is a TODO should such activation be designed, purpose throw here to prevent future mistakes
        if (curBird.dieCount > 1) {
            throw new Error('dieCount > 1 currently not implemented (nor required) currently')
        }
        let curBirdStats: Record<number, ActivationStats> = {}
        // apply stats from rolling 1 die to 5 dice based on the number of birds in that habitat
        for (const countOfBirdsInHabitat of Array.from({ length: curBird.rollCount }, (_, i) => i + 1)) {
            // all birds wit this power target non-nectar
            const curStats: ActivationStats = rollDiceForXBirdsInHabitatLogic(
                baseGameDie,
                curBird.targetFood,
                countOfBirdsInHabitat,
                curBird.activationResultMode
            )
            curBirdStats[countOfBirdsInHabitat] = curStats
        }
        let result: DiceActivationResult = {
            birdName: curBird.birdName,
            targetFood: curBird.targetFood,
            dieCount: curBird.dieCount,
            rollCount: curBird.rollCount,
            activationResultMode: curBird.activationResultMode,
            activationStats: curBirdStats
        }
        allBirdStats.push(result);
    }
    return allBirdStats
}
