import type { DiceActivationResult, BirdDeckCollection } from "@customTypes";
import { loadBirdCards } from "@data/loadBirdCards";
import { getBirdCardByName } from "@data/helpers/getBirdCardByName";
import { idFriendlyBirdname } from "@render/helpers/idFriendlyBirdName";

const birdCardDeck: BirdDeckCollection = await loadBirdCards();

export function renderPrimaryLayout(layoutCategory: string, layoutId: string, result: DiceActivationResult, includeIndex: boolean = true): HTMLElement {
    // get or create layout container
    let layout = document.getElementById(layoutId) as HTMLElement | null;
    if (!layout) {
        layout = document.createElement("div");
        layout.className = "layout";
        layout.id = layoutId;
        document.body.appendChild(layout);
    }

    // blurb 
    let blurbHeader = document.getElementById(`${layoutId}-activation-header`) as HTMLElement | null;
    if (!blurbHeader) {
        blurbHeader = document.createElement("div");
        blurbHeader.className = "activation-header";
        blurbHeader.id = `${layoutId}-activation-header`;

        const headerTitle = document.createElement("h1");
        const anchorId = `${layoutCategory}-activations`;
        const formattedTitle = layoutId
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        headerTitle.id = anchorId;
        headerTitle.innerHTML = `
  ${formattedTitle}
  <a class="navlink" href="#${anchorId}" style="text-decoration: none;">⤒</a>
`;
        blurbHeader.appendChild(headerTitle);
        layout.appendChild(blurbHeader);

    }

    // index navigation
    if (includeIndex) {
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
            birdIndex.className = 'index'
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
    }

    // creates a result card for this bird only
    const resultCard = document.createElement("div");
    resultCard.className = "result-card";
    resultCard.id = idFriendlyBirdname(result.birdName);

    const curBird = getBirdCardByName(result.birdName, birdCardDeck);

    let powerText = curBird.powerText.replace(/\[/g, "<i>").replace(/\]/g, "</i>");

    const resultHeader = document.createElement("div");
    resultHeader.innerHTML = `
    <h1 class="bird-header">${result.birdName}
      <a class="navlink" href="#${layoutId}" style="text-decoration: none;">^</a>
      <a class="navlink" href="#${layoutCategory}-activations" style="text-decoration: none;">⤒</a>
    </h1>
    <div class="brown-power-wrapper"><h3 class="brown-power-text">${powerText}</h3></div>
  `;
    resultCard.appendChild(resultHeader);

    // append
    layout.appendChild(resultCard);

    return layout;
}
