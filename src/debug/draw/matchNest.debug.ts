import { birdsMatchNest, getMatchNestActivation } from '@logic/drawCardActivations/matchNest';
import type { BirdDeckCollection } from '@customTypes';
import { loadBirdCards } from '@data/loadBirdCards';


export async function debug() {
    debugger;

    const birdDeckCollection: BirdDeckCollection = await loadBirdCards();

    const results = getMatchNestActivation(birdsMatchNest, birdDeckCollection);

    debugger;

    return results
}