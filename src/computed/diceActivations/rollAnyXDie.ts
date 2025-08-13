import type { ActivationStats, diceActivationInput, diceActivationResult } from "@customTypes";
import { baseGameDie } from "@definitions/diceDefinitions";
import { rollAnyXDice } from "@logic/diceActivations/rollAnyXDie";




const birdsWithRollAnyXDice: diceActivationInput[] = [
    { name: 'Eurasian Kestrel', targetFood: 'Rodent', rollCount: 3, activationResultMode: 'binary' },
    { name: 'Great Cormorant', targetFood: 'Fish', rollCount: 2, activationResultMode: 'binary' },
    { name: 'Rhinoceros Auklet', targetFood: 'Fish', rollCount: 2, activationResultMode: 'binary' },
    { name: 'Sri Lanka Frogmouth', targetFood: 'Invertebrate', rollCount: 1, activationResultMode: 'binary' },
]

export function getRollAnyXDiceBirdActivation(): diceActivationResult[] {
    return birdsWithRollAnyXDice.map(bird => {
        // as all rollAnyXDice power only target non-nectar foods, can safely use basegame die
        const activationStats: ActivationStats = rollAnyXDice(
            baseGameDie,
            bird.targetFood,
            bird.rollCount,
            bird.activationResultMode
        )
        return {
            name: bird.name,
            targetFood: bird.targetFood,
            rollCount: bird.rollCount,
            activationStats: activationStats
        }
    }
    );
}
