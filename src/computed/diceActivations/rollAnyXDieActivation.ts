import type { ActivationStats, diceActivationInput, diceActivationResult } from "@customTypes";
import { baseGameDie } from "@definitions/diceDefinitions";
import { rollAnyXDiceLogic } from "@logic/diceActivations/rollAnyXDieLogic";




const birdsWithRollAnyXDice: diceActivationInput[] = [
    { birdName: 'Eurasian Kestrel', targetFood: 'Rodent', rollCount: 3, activationResultMode: 'binary' },
    { birdName: 'Great Cormorant', targetFood: 'Fish', rollCount: 2, activationResultMode: 'binary' },
    { birdName: 'Rhinoceros Auklet', targetFood: 'Fish', rollCount: 2, activationResultMode: 'binary' },
    { birdName: 'Sri Lanka Frogmouth', targetFood: 'Invertebrate', rollCount: 1, activationResultMode: 'binary' },
]

export function getRollAnyXDiceBirdActivations(): diceActivationResult[] {
    return birdsWithRollAnyXDice.map(bird => {
        // as all rollAnyXDice power only target non-nectar foods, can safely use basegame die
        const activationStats: ActivationStats = rollAnyXDiceLogic(
            baseGameDie,
            bird.targetFood,
            bird.rollCount,
            bird.activationResultMode
        )
        return {
            birdName: bird.birdName,
            targetFood: bird.targetFood,
            rollCount: bird.rollCount,
            activationStats: activationStats
        }
    }
    );
}
