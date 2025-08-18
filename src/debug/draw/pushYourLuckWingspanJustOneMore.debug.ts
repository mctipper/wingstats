import { birdsPushYourLuckWingspanJustOneMore, getPushYourLuckWingspanJustOneMoreActivation } from '@logic/drawCardActivations/pushYourLuckWingspanJustOneMore';
import type { BirdDeckCollection } from '@customTypes';
import { loadBirdCards } from '@data/loadBirdCards';


export async function debug() {
    debugger;

    const birdDeckCollection: BirdDeckCollection = await loadBirdCards();

    const results = getPushYourLuckWingspanJustOneMoreActivation(birdsPushYourLuckWingspanJustOneMore, birdDeckCollection);

    debugger;

    return results
}