import type { BirdCard, BirdDeckCollection, Expansion } from "@customTypes"


export function getBirdCardByName(birdName: string, birdDeckCollection: BirdDeckCollection): BirdCard {
    for (const expansion of Object.keys(birdDeckCollection) as Expansion[]) {
        const deck = birdDeckCollection[expansion];
        const targetCard: BirdCard = deck.cards.filter(card => card.commonName === birdName)[0]; // will only every return 1 card
        if (targetCard) {
            return targetCard
        };
    }
    throw new Error(`Bird Card with name ${birdName} not found`)
}