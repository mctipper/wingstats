import type { DiceActivationResult, BirdDeckCollection } from "@customTypes";
import { loadBirdCards } from "@data/loadBirdCards";
import { getBirdCardByName } from "@data/helpers/getBirdCardByName";
import { idFriendlyBirdname } from "./helpers/idFriendlyBirdName";

const birdCardDeck: BirdDeckCollection = await loadBirdCards();

export function renderPrimaryLayout(layoutId: string, result: DiceActivationResult): HTMLElement {
    // Get or create layout container
    let layout = document.getElementById(layoutId) as HTMLElement | null;
    if (!layout) {
        layout = document.createElement("div");
        layout.className = "layout";
        layout.id = layoutId;
        document.body.appendChild(layout);
    }

    // Create layout header if missing
    let blurbHeader = document.getElementById(`${layoutId}-blurb-header`) as HTMLElement | null;
    if (!blurbHeader) {
        blurbHeader = document.createElement("div");
        blurbHeader.className = "blurb-header";
        blurbHeader.id = `${layoutId}-blurb-header`;

        const headerTitle = document.createElement("h1");
        headerTitle.innerHTML = layoutId
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        blurbHeader.appendChild(headerTitle);
        layout.appendChild(blurbHeader);
    }

    // index navigation 
    // check if already exists 
    let birdIndex = document.getElementById(`${layoutId}-index`) as HTMLElement | null;
    let birdIndexList: HTMLUListElement;
    if (birdIndex) {
        // use existing 
        birdIndexList = birdIndex.querySelector('ul.index-list') as HTMLUListElement;
        if (!birdIndexList) {
            birdIndexList = document.createElement('ul');
            birdIndexList.className = 'index-list';
            birdIndex.appendChild(birdIndexList);
        }
    } else {
        // create 
        birdIndex = document.createElement('div');
        birdIndex.className = 'bird-index'
        birdIndex.id = `${layoutId}-index`;
        birdIndexList = document.createElement('ul');
        birdIndexList.className = 'index-list';
        birdIndex.appendChild(birdIndexList);
        layout.appendChild(birdIndex)
    }

    // create and append new list item with anchor link 
    const listItem = document.createElement('li')
    listItem.className = 'index-item'
    const link = document.createElement('a')
    link.href = `#${result.birdName.replace(/\s+/g, '-')}`
    link.textContent = result.birdName
    listItem.appendChild(link)
    birdIndexList?.appendChild(listItem)

    // Create result card for this bird
    const resultCard = document.createElement("div");
    resultCard.className = "result-card";
    resultCard.id = idFriendlyBirdname(result.birdName);

    // Get bird card data
    const curBird = getBirdCardByName(result.birdName, birdCardDeck);

    // Replace [brackets] with <i> tags
    let powerText = curBird.powerText.replace(/\[/g, "<i>").replace(/\]/g, "</i>");

    const resultHeader = document.createElement("div");
    resultHeader.innerHTML = `
    <h1 class="bird-header">${result.birdName}
      <a href="#${layoutId}" style="text-decoration: none;">^</a>
    </h1>
    <div class="brown-power-wrapper"><h3 class="brown-power-text">${powerText}</h3></div>
  `;
    resultCard.appendChild(resultHeader);
    layout.appendChild(resultCard);

    return layout;
}
