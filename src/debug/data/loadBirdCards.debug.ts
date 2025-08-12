import { loadBirdCards } from "@data/loadBirdCards";
import type { AllBirdDecks } from '@customTypes/BirdCardDeck';


export async function debug(): Promise<any> {
    const decks: AllBirdDecks = await loadBirdCards()
    console.log(decks.Asia.cards.length)
    debugger;
    return {
        'base': decks.BaseGame.cards.length,
        'european': decks.European.cards.length,
        'oceania': decks.Oceania.cards.length,
        'asia': decks.Asia.cards.length,
    };
}