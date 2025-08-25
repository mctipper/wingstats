import type { DiceActivationResult, BirdDeckCollection } from "@customTypes"
import { loadBirdCards } from "@data/loadBirdCards"
import { getBirdCardByName } from "@data/helpers/getBirdCardByName"

const birdCardDeck: BirdDeckCollection = await loadBirdCards()

export function renderPushYourLuck(result: DiceActivationResult): HTMLElement {
  const card = document.createElement('div')
  card.className = 'result-card'
  // for anchor nav
  card.id = `${result.birdName.replace(/\s+/g, '-')}`

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

  // update the nav index
  const indexList = document.getElementById('index-list')
  const item = document.createElement('li')
  item.className = 'index-item'

  const link = document.createElement('a')
  link.href = `#${result.birdName.replace(/\s+/g, '-')}`
  link.textContent = result.birdName

  item.appendChild(link)
  indexList?.appendChild(item)

  const section = document.createElement('section')

  // create a results 'block' for each number of dice being rolled
  for (const [index, stat] of Object.entries(result.activationStats)) {
    const block = document.createElement('div')
    block.className = 'activation-block'

    const plural = index === '1' ? 'success' : 'successes'
    const title = document.createElement('h4')
    title.innerHTML = `Stopping after <strong><i><big>${index}</big></i></strong> ${plural}`
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
      item.innerHTML = `<strong>${outcome}</strong>: ${(prob * 100).toFixed(3)}%`
      distributionList.appendChild(item)
    }

    block.appendChild(distributionTitle)
    block.appendChild(distributionList)
    section.appendChild(block)
  }

  card.appendChild(section)
  return card
}
