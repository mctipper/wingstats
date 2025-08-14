import type { DiceActivations, Die, Food, ActivationResultMode, ActivationStats, DiceActivationInput, DiceActivationResult } from '@customTypes';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import { baseGameDie } from '@definitions/diceDefinitions';


export const birdsWithRollAnyXDice: DiceActivationInput[] = [
    { birdName: 'Eurasian Kestrel', targetFood: 'Rodent', rollCount: 3, activationResultMode: 'binary' },
    { birdName: 'Great Cormorant', targetFood: 'Fish', rollCount: 2, activationResultMode: 'binary' },
    { birdName: 'Rhinoceros Auklet', targetFood: 'Fish', rollCount: 2, activationResultMode: 'binary' },
    { birdName: 'Sri Lanka Frogmouth', targetFood: 'Invertebrate', rollCount: 1, activationResultMode: 'binary' },
]


export function rollAnyXDiceLogic(
    die: Die,
    targetFood: Food | Food[],
    rollCount: number,
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'roll any x dice' style activation
    const activationName: DiceActivations = 'rollAnyXDice';
    const permitReroll: boolean = false;
    return activationResultMode === 'binary'
        ? getDiceBinaryActivationStats(activationName, die, targetFood, rollCount, permitReroll)
        : getDiceBinomialActivationStats(activationName, die, targetFood, rollCount, permitReroll);
}


export function getRollAnyXDiceBirdActivations(birdsWithRollAnyXDice: DiceActivationInput[]): DiceActivationResult[] {
    return birdsWithRollAnyXDice.map(bird => {
        const activationStats: Record<number, ActivationStats> = {};
        // as all rollAnyXDice power only target non-nectar foods, can safely use basegame die
        activationStats[0] = rollAnyXDiceLogic(
            baseGameDie,
            bird.targetFood,
            bird.rollCount,
            bird.activationResultMode
        )
        return {
            birdName: bird.birdName,
            targetFood: bird.targetFood,
            rollCount: bird.rollCount,
            activationResultMode: bird.activationResultMode,
            activationStats: activationStats
        }
    }
    );
}
