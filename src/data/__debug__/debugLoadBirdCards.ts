import { loadBirdCards } from "../loadBirdCards";

loadBirdCards().then(decks => {
  // auto-breakpoint
  debugger;
  console.log(decks.BaseGame.cards.length)
  console.log('decks loaded successfully');
}).catch(err => {
  console.error('error thrown during bird card loading', err);
});
