import { birdsRollDiceNotInTheBirdfeeder, getRollDiceNotInTheBirdfeederActivation } from "@logic/diceActivations/rollDiceNotInTheBirdfeeder";
import { renderRollDiceNotInBirdfeederResult } from "@render/dice/renderRollDiceNotInBirdfeeder"

import { birdsWithRollAnyXDice, getRollAnyXDiceBirdActivation } from "@logic/diceActivations/rollAnyXDie";
import { renderRollAnyXDie } from "@render/dice/renderRollAnyXDie";

import type { DiceActivationInput, DiceActivationResult, DrawActivationResult } from "@customTypes";


function displayActivationResults(layoutCategory: string, layoutId: string, getFunction: Function, birds: DiceActivationInput[] | DrawActivationResult[], renderFunction: Function) {
    // add to index
    let indexList = document.getElementById(`${layoutCategory}-index-list`) as HTMLUListElement;

    const listItem = document.createElement('li')
    listItem.className = 'index-item'

    const link = document.createElement('a')
    link.href = `#${layoutId}`
    link.textContent = `${layoutId.replace(/-/g, ' ')}`

    listItem.appendChild(link)
    indexList?.appendChild(listItem)

    // render layout
    const lr = document.getElementById(`${layoutCategory}-layout`)

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
    'roll-dice-not-in-the-birdfeeder': () => displayActivationResults('dice', 'roll-dice-not-in-the-birdfeeder', getRollDiceNotInTheBirdfeederActivation, birdsRollDiceNotInTheBirdfeeder, renderRollDiceNotInBirdfeederResult),
    'roll-any-x-dice': () => displayActivationResults('dice', 'roll-any-x-dice', getRollAnyXDiceBirdActivation, birdsWithRollAnyXDice, renderRollAnyXDie),
}


// run them all
Object.values(layoutResultsMap).forEach(fn => fn());