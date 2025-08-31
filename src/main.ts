import { birdsRollDiceNotInTheBirdfeeder, getRollDiceNotInTheBirdfeederActivation } from "@logic/diceActivations/rollDiceNotInTheBirdfeeder";
import { renderRollDiceNotInBirdfeederResult } from "@render/dice/renderRollDiceNotInBirdfeeder"

import { birdsWithRollAnyXDice, getRollAnyXDiceBirdActivation } from "@logic/diceActivations/rollAnyXDie";
import { renderRollAnyXDie } from "@render/dice/renderRollAnyXDie";

import { birdsRollDiceForXBirdsInHabitiat, getRollDiceForXBirdsInHabitiatActivation } from "@logic/diceActivations/rollDiceForXBirdsInHabitat";
import { renderRollDiceForXBirdsInHabitat } from "@render/dice/renderRollDiceForXBirdsInHabitat";

import { birdsResetTheBirdfeeder, getResetTheBirdfeederActivations } from "@logic/diceActivations/resetTheBirdfeeder";
import { renderResetTheBirdfeeder } from "@render/dice/renderResetTheBirdfeeder";

import { birdsPushYourLuck, getPushYourLuckActivation } from "@logic/diceActivations/pushYourLuck";
import { renderPushYourLuck } from "@render/dice/renderPushYourLuck";

import { birdsPhilippineEagle, getPhilippineEagleActivation } from "@logic/diceActivations/philippineEagle";
import { renderPhilippineEagle } from "@render/dice/renderPhilippineEagle";

import { birdsMaskedLapwing, getMaskedLapwingActivation } from "@logic/diceActivations/maskedLapwing";
import { renderMaskedLapwing } from "@render/dice/renderMaskedLapwing";

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
            const layout = renderFunction(layoutCategory, layoutId, result)
            lr.appendChild(layout)
        });
    }
}


const layoutResultsMap: Record<string, () => void> = {
    'reset-the-birdfeeder': () => displayActivationResults('dice', 'reset-the-birdfeeder', getResetTheBirdfeederActivations, birdsResetTheBirdfeeder, renderResetTheBirdfeeder),
    'roll-dice-not-in-the-birdfeeder': () => displayActivationResults('dice', 'roll-dice-not-in-the-birdfeeder', getRollDiceNotInTheBirdfeederActivation, birdsRollDiceNotInTheBirdfeeder, renderRollDiceNotInBirdfeederResult),
    'push-your-luck': () => displayActivationResults('dice', 'push-your-luck', getPushYourLuckActivation, birdsPushYourLuck, renderPushYourLuck),
    'roll-any-x-dice': () => displayActivationResults('dice', 'roll-any-x-dice', getRollAnyXDiceBirdActivation, birdsWithRollAnyXDice, renderRollAnyXDie),
    'roll-dice-for-x-birds-in-habitat': () => displayActivationResults('dice', 'roll-dice-for-x-birds-in-habitat', getRollDiceForXBirdsInHabitiatActivation, birdsRollDiceForXBirdsInHabitiat, renderRollDiceForXBirdsInHabitat),
    'philippine-eagle': () => displayActivationResults('dice', 'philippine-eagle', getPhilippineEagleActivation, birdsPhilippineEagle, renderPhilippineEagle),
    'masked-lapwing': () => displayActivationResults('dice', 'masked-lapwing', getMaskedLapwingActivation, birdsMaskedLapwing, renderMaskedLapwing),
}


// run them all
Object.values(layoutResultsMap).forEach(fn => fn());