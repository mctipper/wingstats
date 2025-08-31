import type { DiceActivationResult } from "@customTypes"
import { idFriendlyBirdname } from "@render/helpers/idFriendlyBirdName";
import { renderPrimaryLayout } from "@render/primaryRender"

export function renderRollAnyXDie(layoutId: string, result: DiceActivationResult): HTMLElement {
    // header and greater container
    let layout = renderPrimaryLayout(layoutId, result);

    // build out the stats sections
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

    const evBox = document.createElement('div')
    evBox.className = 'stat-box ev'
    evBox.innerHTML = `
    <div class="stat-label">Expected Value</div>
    <div class="stat-value">${result.activationStats[0].expectedValue.toFixed(3)}</div>
`

    statRow.appendChild(successBox)
    statRow.appendChild(evBox)
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

    let resultCard = document.getElementById(idFriendlyBirdname(result.birdName))
    resultCard!.appendChild(section)

    return layout
}
