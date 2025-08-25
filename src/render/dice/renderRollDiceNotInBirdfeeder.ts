import type { DiceActivationResult } from "@customTypes"

export function renderRollDiceNotInBirdfeederResult(result: DiceActivationResult): HTMLElement {
    const card = document.createElement('div')
    card.className = 'result-card'

    // for anchor nav
    card.id = `${result.birdName.replace(/\s+/g, '-')}` // e.g. bird-Eastern-Bluebird

    const header = document.createElement('div')
    header.innerHTML = `
    <h1>${result.birdName}</h1>
    <h3>🎯 Target: <strong>${result.targetFood}</strong> | 🎲 Dice: ${result.die}</h3>
  `
    card.appendChild(header)

    const section = document.createElement('section')

    // update the index
    const indexList = document.getElementById('index-list')
    const item = document.createElement('li')
    item.className = 'index-item'

    const link = document.createElement('a')
    link.href = `#${result.birdName.replace(/\s+/g, '-')}`
    link.textContent = result.birdName

    item.appendChild(link)
    indexList?.appendChild(item)


    for (const [index, stat] of Object.entries(result.activationStats)) {
        const block = document.createElement('div')
        block.className = 'activation-block'

        const plural = index === '1' ? 'die' : 'dice'
        const title = document.createElement('h4')
        title.innerHTML = `With <strong><i><big>${index}</big></i></strong> ${plural} not in the birdfeeder`
        block.appendChild(title)

        // First row: stat boxes
        const statRow = document.createElement('div')
        statRow.className = 'stat-row'

        const successBox = document.createElement('div')
        successBox.className = 'stat-box success'
        successBox.innerHTML = `
      <div class="stat-label">Success Chance</div>
      <div class="stat-value">${(stat.anySuccess * 100).toFixed(1)}%</div>
    `

        const evBox = document.createElement('div')
        evBox.className = 'stat-box ev'
        evBox.innerHTML = `
      <div class="stat-label">Expected Value</div>
      <div class="stat-value">${stat.expectedValue.toFixed(3)}</div>
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

        for (const [outcome, prob] of Object.entries(stat.distribution)) {
            const item = document.createElement('div')
            item.className = 'distribution-item'
            item.innerHTML = `<strong>${outcome}</strong>: ${(prob * 100).toFixed(1)}%`
            distributionList.appendChild(item)
        }

        block.appendChild(distributionTitle)
        block.appendChild(distributionList)
        section.appendChild(block)
    }

    card.appendChild(section)
    return card
}
