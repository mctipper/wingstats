import type { DiceActivationResult, BirdDeckCollection } from "@customTypes"
import { loadBirdCards } from "@data/loadBirdCards"
import { getBirdCardByName } from "@data/helpers/getBirdCardByName"

const birdCardDeck: BirdDeckCollection = await loadBirdCards()

export function renderMaskedLapwing(result: DiceActivationResult): HTMLElement {
    const card = document.createElement('div')
    card.className = 'result-card'

    // get the card text
    const curBird = getBirdCardByName(result.birdName, birdCardDeck)

    // brute force change of squarebrakcets to italics markers because ECMAscript goodness
    let powerText = curBird.powerText.replace('[', '<i>').replace(']', '</i>')
    while (powerText.includes('[') && powerText.includes(']')) {
        powerText = powerText.replace('[', '<i>').replace(']', '</i>')
    }

    const header = document.createElement('div')
    header.innerHTML = `
    <h1>${result.birdName}</h1>
    <h3>${powerText}</h3>
  `

    card.appendChild(header)

    const section = document.createElement('section')

    // create a results 'block' for each number of dice being rolled
    const block = document.createElement('div')
    block.className = 'activation-block'

    // only care about distrubiton here
    const distributionTitle = document.createElement('div')
    distributionTitle.className = 'distribution-title'
    distributionTitle.textContent = '🎲 Expected Food Gain Probability'

    const distributionList = document.createElement('div')
    distributionList.className = 'distribution-list'

    for (const [outcome, prob] of Object.entries(result.activationStats[0].distribution)) {
        const item = document.createElement('div')
        item.className = 'distribution-item'
        item.innerHTML = `<strong>${outcome}</strong>: ${(prob * 100).toFixed(3)}%`
        distributionList.appendChild(item)
    }

    block.appendChild(distributionTitle)
    block.appendChild(distributionList)
    section.appendChild(block)

    card.appendChild(section)
    return card
}
