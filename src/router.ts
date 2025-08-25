import { birdsRollDiceNotInTheBirdfeeder, getRollDiceNotInTheBirdfeederActivation } from "@logic/diceActivations/rollDiceNotInTheBirdfeeder";
import { renderRollDiceNotInBirdfeederResult } from "@render/dice/renderRollDiceNotInBirdfeeder"

import { birdsRollDiceForXBirdsInHabitiat, getRollDiceForXBirdsInHabitiatActivation } from "@logic/diceActivations/rollDiceForXBirdsInHabitat";
import { renderRollDiceForXBirdsInHabitat } from "@render/dice/renderRollDiceForXBirdsInHabitat";

import { birdsWithRollAnyXDice, getRollAnyXDiceBirdActivation } from "@logic/diceActivations/rollAnyXDie";
import { renderRollAnyXDie } from "@render/dice/renderRollAnyXDie";

import { birdsResetTheBirdfeeder, getResetTheBirdfeederActivations } from "@logic/diceActivations/resetTheBirdfeeder";
import { renderResetTheBirdfeeder } from "@render/dice/renderResetTheBirdfeeder";

import { birdsPushYourLuck, getPushYourLuckActivation } from "@logic/diceActivations/pushYourLuck";
import { renderPushYourLuck } from "@render/dice/renderPushYourLuck";

import { birdsPhilippineEagle, getPhilippineEagleActivation } from "@logic/diceActivations/philippineEagle";
import { renderPhilippineEagle } from "@render/dice/renderPhilippineEagle";

import { birdsMaskedLapwing, getMaskedLapwingActivation } from "@logic/diceActivations/maskedLapwing";
import { renderMaskedLapwing } from "@render/dice/renderMaskedLapwing";

import type { DiceActivationInput, DiceActivationResult, DrawActivationResult } from "@customTypes";


async function displayActivationResults(layout: string, getFunction: Function, birds: DiceActivationInput[] | DrawActivationResult[], renderFunction: Function) {
    await renderLayout(layout)
    const rc = document.getElementById('results-container')
    console.log(`Rendering ${layout}`)
    if (rc) {
        const results: DiceActivationResult[] | DrawActivationResult[] = getFunction(birds)
        results.forEach(result => {
            const resultCard = renderFunction(result)
            rc.appendChild(resultCard)
        });
    }
}

const routes: Record<string, () => Promise<void>> = {
    '/': () => renderLayout('home'),
    '/dice/roll-dice-not-in-the-birdfeeder': async () => await displayActivationResults('/dice/roll-dice-not-in-the-birdfeeder', getRollDiceNotInTheBirdfeederActivation, birdsRollDiceNotInTheBirdfeeder, renderRollDiceNotInBirdfeederResult),
    '/dice/roll-dice-for-x-birds-in-habitat': async () => await displayActivationResults('/dice/roll-dice-for-x-birds-in-habitat', getRollDiceForXBirdsInHabitiatActivation, birdsRollDiceForXBirdsInHabitiat, renderRollDiceForXBirdsInHabitat),
    '/dice/roll-any-x-die': async () => await displayActivationResults('/dice/roll-any-x-die', getRollAnyXDiceBirdActivation, birdsWithRollAnyXDice, renderRollAnyXDie),
    '/dice/reset-the-birdfeeder': async () => await displayActivationResults('/dice/reset-the-birdfeeder', getResetTheBirdfeederActivations, birdsResetTheBirdfeeder, renderResetTheBirdfeeder),
    '/dice/push-your-luck': async () => await displayActivationResults('/dice/push-your-luck', getPushYourLuckActivation, birdsPushYourLuck, renderPushYourLuck),
    '/dice/philippine-eagle': async () => await displayActivationResults('/dice/philippine-eagle', getPhilippineEagleActivation, birdsPhilippineEagle, renderPhilippineEagle),
    '/dice/masked-lapwing': async () => await displayActivationResults('/dice/masked-lapwing', getMaskedLapwingActivation, birdsMaskedLapwing, renderMaskedLapwing),
    // TODO more routes
}

function getRoutePath(): string {
    return location.pathname.replace('/wingstats', '') || '/'
}

async function renderLayout(name: string) {
    const res = await fetch(`/wingstats/layouts/${name}.html`)
    const html = await res.text()
    document.getElementById('layout-root')!.innerHTML = html
}

function handleRoute() {
    const route = routes[getRoutePath()]
    if (route) route()
    else document.getElementById('layout-root')!.innerHTML = '<p>404: Page not found</p>'
}

window.addEventListener('DOMContentLoaded', handleRoute)
window.addEventListener('popstate', handleRoute)

document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/wingstats/')) {
        e.preventDefault()
        const href = target.getAttribute('href')!
        history.pushState({}, '', href)
        handleRoute()
    }
})
