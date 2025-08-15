import { birdsMatchWingspan, getMatchWingspanActivation } from '@logic/drawCardActivations/matchWingspan';
import type { BirdDeckCollection } from '@customTypes';
import { loadBirdCards } from '@data/loadBirdCards';


export async function debug() {
    debugger;

    const birdDeckCollection: BirdDeckCollection = await loadBirdCards();

    const results = getMatchWingspanActivation(birdsMatchWingspan, birdDeckCollection);

    debugger;

    return results
}