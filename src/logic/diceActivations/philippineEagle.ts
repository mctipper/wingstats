import type { DiceActivations, Die, Food, ActivationStats, DiceActivationInput, DiceActivationResult } from '@customTypes';
import { getDiceWithholdingActivationStats } from '@logic/diceActivations/helpers';
import { baseGameDie } from '@definitions/diceDefinitions';

// yeah this is a bit redundant, keeping the same pattern as others though...
export const birdsPhilippineEagle: DiceActivationInput[] = [
    { birdName: 'Philippine Eagle', targetFood: 'Rodent', dieCount: 5, rollCount: 3, activationResultMode: 'withholding' },
]


export function philippineEagleLogic(
    die: Die,
    targetFood: Food | Food[],
    dieCount: number,
    rollCount: number
): ActivationStats {
    // wrapper function to explicitly call the 'masked lapwing' style activation
    const activationName: DiceActivations = 'philippineEagle';
    return getDiceWithholdingActivationStats(activationName, die, targetFood, dieCount, rollCount)
}


export function getPhilippineEagleActivation(birdsPhilippineEagle: DiceActivationInput[]): DiceActivationResult[] {
    return birdsPhilippineEagle.map(bird => {
        const activationStats: Record<number, ActivationStats> = {};
        // as all philippineEagle power only target non-nectar foods, can safely use basegame die
        activationStats[0] = philippineEagleLogic(
            baseGameDie,
            bird.targetFood,
            bird.dieCount,
            bird.rollCount
        )
        return {
            birdName: bird.birdName,
            targetFood: bird.targetFood,
            die: baseGameDie.version,
            dieCount: bird.dieCount,
            rollCount: bird.rollCount,
            activationResultMode: bird.activationResultMode,
            activationStats: activationStats
        }
    }
    );
}
