import { loadBirdCards } from "@data/loadBirdCards";
import type { BirdDeckCollection } from '@customTypes';


export async function debug(): Promise<any> {
    debugger;

    const decks: BirdDeckCollection = await loadBirdCards()

    debugger;

    return {
        'base': decks.BaseGame.cards.length,
        'european': decks.European.cards.length,
        'oceania': decks.Oceania.cards.length,
        'asia': decks.Asia.cards.length,
    };
}