import type { ActivationStats, DiceActivationInput, DiceActivationResult } from "@customTypes";
import { baseGameDie } from "@definitions/diceDefinitions";
import { rollDiceNotInTheBirdfeederLogic } from "@logic/diceActivations/rollDiceNotInTheBirdfeederLogic";



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

export function getRollDiceNotInTheBirdfeederActivation(birdsRollDiceNotInTheBirdfeeder: DiceActivationInput[]): DiceActivationResult[] {
    let allBirdStats: DiceActivationResult[] = []
    for (let curBird of birdsRollDiceNotInTheBirdfeeder) {
        let curBirdStats: Record<number, ActivationStats> = {}
        // apply stats from rolling 1 die to 4 dice outside the birdfeeder, as indicated by the Record index
        for (const thisRollCount of Array.from({ length: curBird.rollCount }, (_, i) => i + 1)) {
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
