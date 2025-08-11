import './style.css'
import { loadBirdCards } from "./data/loadBirdCards";
import type { AllBirdDecks } from './types/BirdCardDeck';


const decks: AllBirdDecks = await loadBirdCards()
console.log(decks.Asia.cards.length)
