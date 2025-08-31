import type { DiceActivations, Die, Food, ActivationStats, DiceActivationInput, DiceActivationResult } from '@customTypes';
import { getDiceSequentialActivationStats } from '@logic/diceActivations/helpers';
import { baseGameDie } from '@definitions/diceDefinitions';



export const birdsPushYourLuck: DiceActivationInput[] = [
    { birdName: 'Brahminy Kite', targetFood: ['Fish', 'Rodent'], dieCount: 3, rollCount: 3, activationResultMode: 'sequential' },
    { birdName: 'Forest Owlet', targetFood: ['Invertebrate', 'Rodent'], dieCount: 2, rollCount: 3, activationResultMode: 'sequential' },
    { birdName: 'Purple Heron', targetFood: ['Invertebrate', 'Fish'], dieCount: 2, rollCount: 3, activationResultMode: 'sequential' },
    { birdName: 'White-Throated Kingfisher', targetFood: ['Invertebrate', 'Fish', 'Rodent'], dieCount: 1, rollCount: 3, activationResultMode: 'sequential' },
]


export function pushYourLuckLogic(
    die: Die,
    targetFood: Food | Food[],
    dieCount: number,
    rollCount: number
): ActivationStats {
    // wrapper function to explicitly call the 'roll dice not in the birdfeeder' style activation
    const activationName: DiceActivations = 'pushYourLuck';
    return getDiceSequentialActivationStats(activationName, die, targetFood, dieCount, rollCount);
}

export function getPushYourLuckActivation(birdsPushYourLuck: DiceActivationInput[]): DiceActivationResult[] {
    let allBirdStats: DiceActivationResult[] = []
    for (let curBird of birdsPushYourLuck) {
        let curBirdStats: Record<number, ActivationStats> = {}
        // attempt expected success when stopping after X rolls
        for (const thisStopTactic of Array.from({ length: curBird.rollCount }, (_, i) => i + 1)) {
            // all birds with this power target non-nectar
            const curStats: ActivationStats = pushYourLuckLogic(
                baseGameDie,
                curBird.targetFood,
                curBird.dieCount,
                thisStopTactic
            )
            curBirdStats[thisStopTactic] = curStats
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