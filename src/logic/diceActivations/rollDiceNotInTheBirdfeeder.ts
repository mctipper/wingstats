import type { DiceActivations, Die, Food, ActivationResultMode, ActivationStats, DiceActivationInput, DiceActivationResult } from '@customTypes';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import { baseGameDie } from '@definitions/diceDefinitions';



export const birdsRollDiceNotInTheBirdfeeder: DiceActivationInput[] = [
    { birdName: 'American Kestrel', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Anhinga', targetFood: 'Fish', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Barn Owl', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Black Skimmer', targetFood: 'Fish', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Broad-Winged Hawk', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Burrowing Owl', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Common Merganser', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Eastern Screech Owl', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Eleonora\'s Falcon', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Ferruginous Hawk', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Mississippi Kite', targetFood: 'Rodent', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Northern Gannet', targetFood: 'Fish', rollCount: 4, activationResultMode: 'binomial' },
    { birdName: 'Snowy Egret', targetFood: 'Fish', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'White-Faced Ibis', targetFood: 'Fish', rollCount: 4, activationResultMode: 'binary' },
    { birdName: 'Willet', targetFood: 'Fish', rollCount: 4, activationResultMode: 'binary' },

]


export function rollDiceNotInTheBirdfeederLogic(
    die: Die,
    targetFood: Food | Food[],
    rollCount: number,
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'roll dice not in the birdfeeder' style activation
    if (rollCount >= 5) throw new Error('Cannot activate with > 4 dice');
    const activationName: DiceActivations = 'rollDiceNotInTheBirdfeeder';
    const permitReroll: boolean = false;
    return activationResultMode === 'binary'
        ? getDiceBinaryActivationStats(activationName, die, targetFood, rollCount, permitReroll)
        : getDiceBinomialActivationStats(activationName, die, targetFood, rollCount, permitReroll);
}


export function getRollDiceNotInTheBirdfeederActivation(birdsRollDiceNotInTheBirdfeeder: DiceActivationInput[]): DiceActivationResult[] {
    let allBirdStats: DiceActivationResult[] = []
    for (let curBird of birdsRollDiceNotInTheBirdfeeder) {
        let curBirdStats: Record<number, ActivationStats> = {}
        // apply stats from rolling 1 die to 4 dice outside the birdfeeder, as indicated by the Record index
        for (const thisRollCount of Array.from({ length: curBird.rollCount }, (_, i) => i + 1)) {
            // all birds wit this power target non-nectar
            const curStats: ActivationStats = rollDiceNotInTheBirdfeederLogic(
                baseGameDie,
                curBird.targetFood,
                thisRollCount,
                curBird.activationResultMode
            )
            curBirdStats[thisRollCount] = curStats
        }
        let result: DiceActivationResult = {
            birdName: curBird.birdName,
            targetFood: curBird.targetFood,
            rollCount: curBird.rollCount,
            activationResultMode: curBird.activationResultMode,
            activationStats: curBirdStats
        }
        allBirdStats.push(result);
    }
    return allBirdStats
}
