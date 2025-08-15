import { birdsMatchPredator, getMatchPredatorActivation } from '@logic/drawCardActivations/matchPredator'
import type { BirdDeckCollection } from '@customTypes';
import { loadBirdCards } from '@data/loadBirdCards';


export async function debug() {
    debugger;

    const birdDeckCollection: BirdDeckCollection = await loadBirdCards();

    const results = getMatchPredatorActivation(birdsMatchPredator, birdDeckCollection);

    debugger;

    return results
}