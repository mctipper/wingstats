import type { DiceActivations, Die, Food, ActivationResultMode, ActivationStats, DiceActivationInput, DiceActivationResult } from '@customTypes';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import { baseGameDie } from "@definitions/diceDefinitions";


const rollCount: number = 5


export const birdsResetTheBirdfeeder: DiceActivationInput[] = [
    { birdName: 'Black Noddy', targetFood: 'Fish', rollCount: rollCount, activationResultMode: 'binomial' },
    { birdName: 'Black-Shouldered Kite', targetFood: 'Rodent', rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Bullfinch', targetFood: ['Seed', 'Fruit'], rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'European Bee-Eater', targetFood: 'Invertebrate', rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'European Honey Buzzard', targetFood: 'Invertebrate', rollCount: rollCount, activationResultMode: 'binomial' },
    { birdName: 'Galah', targetFood: 'Seed', rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Great Tit', targetFood: ['Fish', 'Fruit', 'Invertebrate', 'Rodent', 'Seed'], rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Grey Shrikethrush', targetFood: 'Rodent', rollCount: rollCount, activationResultMode: 'binomial' },
    { birdName: 'Hawfinch', targetFood: 'Seed', rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Laughing Kookaburra', targetFood: ['Fish', 'Invertebrate', 'Rodent'], rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Tawny Frogmouth', targetFood: ['Invertebrate', 'Rodent'], rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'White-Bellied Sea-Eagle', targetFood: ['Fish', 'Rodent'], rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'White-Faced Heron', targetFood: 'Fish', rollCount: rollCount, activationResultMode: 'binomial' },
]



export function resetTheBirdfeederLogic(
    die: Die,
    targetFood: Food | Food[],
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'reset the birdfeeder' style activation
    const activationName: DiceActivations = 'resetTheBirdfeeder'
    const rollCount: number = 5
    const permitReroll: boolean = true
    return activationResultMode === 'binary'
        ? getDiceBinaryActivationStats(activationName, die, targetFood, rollCount, permitReroll)
        : getDiceBinomialActivationStats(activationName, die, targetFood, rollCount, permitReroll);
}

export function getResetTheBirdfeederActivations(birdsResetTheBirdfeeder: DiceActivationInput[]): DiceActivationResult[] {
    return birdsResetTheBirdfeeder.map(bird => {
        const activationStats: Record<number, ActivationStats> = {};
        // as all rollAnyXDice power only target non-nectar foods, can safely use basegame die
        activationStats[0] = resetTheBirdfeederLogic(
            baseGameDie,
            bird.targetFood,
            bird.activationResultMode
        )
        return {
            birdName: bird.birdName,
            targetFood: bird.targetFood,
            rollCount: rollCount,
            activationResultMode: bird.activationResultMode,
            activationStats: activationStats
        }
    }
    );
}
