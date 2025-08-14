import type { DiceActivations, Die, Food, ActivationResultMode, ActivationStats, DiceActivationInput, DiceActivationResult } from '@customTypes';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import { baseGameDie } from '@definitions/diceDefinitions';



export const birdsRollDiceNotInTheBirdfeeder: DiceActivationInput[] = [
    { birdName: 'American Kestrel', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Anhinga', targetFood: 'Fish', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Barn Owl', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Black Skimmer', targetFood: 'Fish', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Broad-Winged Hawk', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Burrowing Owl', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Common Merganser', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Eastern Screech Owl', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Eleonora\'s Falcon', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Ferruginous Hawk', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Mississippi Kite', targetFood: 'Rodent', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Northern Gannet', targetFood: 'Fish', dieCount: 4, rollCount: 1, activationResultMode: 'binomial' },
    { birdName: 'Snowy Egret', targetFood: 'Fish', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'White-Faced Ibis', targetFood: 'Fish', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },
    { birdName: 'Willet', targetFood: 'Fish', dieCount: 4, rollCount: 1, activationResultMode: 'binary' },

]


export function rollDiceNotInTheBirdfeederLogic(
    die: Die,
    targetFood: Food | Food[],
    dieCount: number,
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'roll dice not in the birdfeeder' style activation
    if (dieCount >= 5) throw new Error('Cannot activate with > 4 dice');
    const activationName: DiceActivations = 'rollDiceNotInTheBirdfeeder';
    const permitReroll: boolean = false;
    return activationResultMode === 'binary'
        ? getDiceBinaryActivationStats(activationName, die, targetFood, dieCount, permitReroll)
        : getDiceBinomialActivationStats(activationName, die, targetFood, dieCount, permitReroll);
}


export function getRollDiceNotInTheBirdfeederActivation(birdsRollDiceNotInTheBirdfeeder: DiceActivationInput[]): DiceActivationResult[] {
    let allBirdStats: DiceActivationResult[] = []
    for (let curBird of birdsRollDiceNotInTheBirdfeeder) {
        let curBirdStats: Record<number, ActivationStats> = {}
        // apply stats from rolling 1 die to 4 dice outside the birdfeeder, as indicated by the Record index
        for (const thisDieCount of Array.from({ length: curBird.dieCount }, (_, i) => i + 1)) {
            // all birds wit this power target non-nectar
            const curStats: ActivationStats = rollDiceNotInTheBirdfeederLogic(
                baseGameDie,
                curBird.targetFood,
                thisDieCount,
                curBird.activationResultMode
            )
            curBirdStats[thisDieCount] = curStats
        }
        let result: DiceActivationResult = {
            birdName: curBird.birdName,
            targetFood: curBird.targetFood,
            die: baseGameDie.version,
            dieCount: curBird.dieCount,
            rollCount: curBird.rollCount,
            activationResultMode: curBird.activationResultMode,
            activationStats: curBirdStats
        }
        allBirdStats.push(result);
    }
    return allBirdStats
}
