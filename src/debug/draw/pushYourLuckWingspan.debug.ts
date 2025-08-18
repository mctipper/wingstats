import { birdsPushYourLuckWingspan, getPushYourLuckWingspanActivation } from '@logic/drawCardActivations/pushYourLuckWingspan';
import type { BirdDeckCollection } from '@customTypes';
import { loadBirdCards } from '@data/loadBirdCards';


export async function debug() {
    debugger;

    const birdDeckCollection: BirdDeckCollection = await loadBirdCards();

    const results = getPushYourLuckWingspanActivation(birdsPushYourLuckWingspan, birdDeckCollection);

    debugger;

    return results
}