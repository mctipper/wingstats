import type { DiceActivations, Die, Food, ActivationResultMode, ActivationStats, DiceActivationInput, DiceActivationResult } from '@customTypes';
import { getDiceBinaryActivationStats, getDiceBinomialActivationStats } from '@logic/diceActivations/helpers';
import { baseGameDie } from "@definitions/diceDefinitions";


const dieCount: number = 5
const rollCount: number = 1


export const birdsResetTheBirdfeeder: DiceActivationInput[] = [
    { birdName: 'Black Noddy', targetFood: 'Fish', dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binomial' },
    { birdName: 'Black-Shouldered Kite', targetFood: 'Rodent', dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Bullfinch', targetFood: ['Seed', 'Fruit'], dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'European Bee-Eater', targetFood: 'Invertebrate', dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'European Honey Buzzard', targetFood: 'Invertebrate', dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binomial' },
    { birdName: 'Galah', targetFood: 'Seed', dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Great Tit', targetFood: ['Fish', 'Fruit', 'Invertebrate', 'Rodent', 'Seed'], dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Grey Shrikethrush', targetFood: 'Rodent', dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binomial' },
    { birdName: 'Hawfinch', targetFood: 'Seed', dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Laughing Kookaburra', targetFood: ['Fish', 'Invertebrate', 'Rodent'], dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'Tawny Frogmouth', targetFood: ['Invertebrate', 'Rodent'], dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'White-Bellied Sea-Eagle', targetFood: ['Fish', 'Rodent'], dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binary' },
    { birdName: 'White-Faced Heron', targetFood: 'Fish', dieCount: dieCount, rollCount: rollCount, activationResultMode: 'binomial' },
]



export function resetTheBirdfeederLogic(
    die: Die,
    targetFood: Food | Food[],
    activationResultMode: ActivationResultMode
): ActivationStats {
    // wrapper function to explicitly call the 'reset the birdfeeder' style activation
    const activationName: DiceActivations = 'resetTheBirdfeeder'
    const dieCount: number = 5
    const permitReroll: boolean = true
    return activationResultMode === 'binary'
        ? getDiceBinaryActivationStats(activationName, die, targetFood, dieCount, permitReroll)
        : getDiceBinomialActivationStats(activationName, die, targetFood, dieCount, permitReroll);
}

export function getResetTheBirdfeederActivations(birdsResetTheBirdfeeder: DiceActivationInput[]): DiceActivationResult[] {
    return birdsResetTheBirdfeeder.map(bird => {
        const activationStats: Record<number, ActivationStats> = {};
        // as all resetTheBirdFeeder power (expect special-case Masked Lapwing) only target non-nectar foods, can safely use basegame die
        activationStats[0] = resetTheBirdfeederLogic(
            baseGameDie,
            bird.targetFood,
            bird.activationResultMode
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
