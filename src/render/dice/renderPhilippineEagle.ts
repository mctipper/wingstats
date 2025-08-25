import type { DiceActivationResult, BirdDeckCollection } from "@customTypes"
import { loadBirdCards } from "@data/loadBirdCards"
import { getBirdCardByName } from "@data/helpers/getBirdCardByName"

const birdCardDeck: BirdDeckCollection = await loadBirdCards()

export function renderPhilippineEagle(result: DiceActivationResult): HTMLElement {
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

    // First row: stat boxes
    const statRow = document.createElement('div')
    statRow.className = 'stat-row'

    const successBox = document.createElement('div')
    successBox.className = 'stat-box success'
    successBox.innerHTML = `
    <div class="stat-label">Success Chance</div>
    <div class="stat-value">${(result.activationStats[0].anySuccess * 100).toFixed(1)}%</div>
`
    const title = document.createElement('h4')
    title.innerHTML = 'Rolling 3 rodents after 3 rolls of 5 dice withholding success'
    block.appendChild(title)

    statRow.appendChild(successBox)
    block.appendChild(statRow)

    // Second row: distribution list
    const distributionTitle = document.createElement('div')
    distributionTitle.className = 'distribution-title'
    distributionTitle.textContent = '🎲 Distribution of outcomes'

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
