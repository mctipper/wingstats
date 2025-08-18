import { birdsCountFoodCost, getCountFoodActivation } from '@logic/drawCardActivations/countFoodCost';
import type { BirdDeckCollection } from '@customTypes';
import { loadBirdCards } from '@data/loadBirdCards';


export async function debug() {
    debugger;

    const birdDeckCollection: BirdDeckCollection = await loadBirdCards();

    const results = getCountFoodActivation(birdsCountFoodCost, birdDeckCollection);

    debugger;

    return results
}