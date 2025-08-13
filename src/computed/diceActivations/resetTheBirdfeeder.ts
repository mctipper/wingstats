import type { ActivationStats, diceActivationInput, diceActivationResult } from "@customTypes";
import { baseGameDie } from "@definitions/diceDefinitions";
import { resetTheBirdfeeder } from "@logic/diceActivations/resetTheBirdfeeder";


const rollCount: number = 5

const birdsWithRollAnyXDice: diceActivationInput[] = [
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

export function getResetTheBirdfeederActivations(): diceActivationResult[] {
    return birdsWithRollAnyXDice.map(bird => {
        // as all rollAnyXDice power only target non-nectar foods, can safely use basegame die
        const activationStats: ActivationStats = resetTheBirdfeeder(
            baseGameDie,
            bird.targetFood,
            bird.activationResultMode
        )
        return {
            birdName: bird.birdName,
            targetFood: bird.targetFood,
            rollCount: rollCount,
            activationStats: activationStats
        }
    }
    );
}
