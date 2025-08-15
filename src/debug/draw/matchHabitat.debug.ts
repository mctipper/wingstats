import { birdsMatchHabitat, getMatchHabitatActivation } from '@logic/drawCardActivations/matchHabitat';
import type { BirdDeckCollection } from '@customTypes';
import { loadBirdCards } from '@data/loadBirdCards';


export async function debug() {
    debugger;

    const birdDeckCollection: BirdDeckCollection = await loadBirdCards();

    const results = getMatchHabitatActivation(birdsMatchHabitat, birdDeckCollection);

    debugger;

    return results
}