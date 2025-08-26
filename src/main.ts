import { birdsRollDiceNotInTheBirdfeeder, getRollDiceNotInTheBirdfeederActivation } from "@logic/diceActivations/rollDiceNotInTheBirdfeeder";
import { renderRollDiceNotInBirdfeederResult } from "@render/dice/renderRollDiceNotInBirdfeeder"

import { birdsWithRollAnyXDice, getRollAnyXDiceBirdActivation } from "@logic/diceActivations/rollAnyXDie";
import { renderRollAnyXDie } from "@render/dice/renderRollAnyXDie";

import type { DiceActivationInput, DiceActivationResult, DrawActivationResult } from "@customTypes";


function displayActivationResults(layoutId: string, getFunction: Function, birds: DiceActivationInput[] | DrawActivationResult[], renderFunction: Function) {
    const lr = document.getElementById('layout-root')
    console.log(`Rendering ${layoutId}`)
    if (lr) {
        const results: DiceActivationResult[] | DrawActivationResult[] = getFunction(birds)
        results.forEach(result => {
            const layout = renderFunction(layoutId, result)
            lr.appendChild(layout)
        });
    }
}


const layoutResultsMap: Record<string, () => void> = {
    'roll-dice-not-in-the-birdfeeder': () => displayActivationResults('roll-dice-not-in-the-birdfeeder', getRollDiceNotInTheBirdfeederActivation, birdsRollDiceNotInTheBirdfeeder, renderRollDiceNotInBirdfeederResult),
    'roll-any-x-dice': () => displayActivationResults('roll-any-x-dice', getRollAnyXDiceBirdActivation, birdsWithRollAnyXDice, renderRollAnyXDie),
}


// run them all
Object.values(layoutResultsMap).forEach(fn => fn());