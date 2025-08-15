import { birdsMatchFood, getMatchFoodActivation } from '@logic/drawCardActivations/matchFood';
import type { BirdDeckCollection } from '@customTypes';
import { loadBirdCards } from '@data/loadBirdCards';


export async function debug() {
    debugger;

    const birdDeckCollection: BirdDeckCollection = await loadBirdCards();

    const results = getMatchFoodActivation(birdsMatchFood, birdDeckCollection);

    debugger;

    return results
}