import type {
    ActivationStats,
    DrawCardActivations,
    BirdDeckCollection,
    Expansion,
    Food
} from '@customTypes';
import { getAllSubsets } from '@logic/utils/getAllSubsets';


export function getDrawFoodCountActivationStats(
    activationName: DrawCardActivations,
    target: Food,
    drawCount: number,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName?: string
): Record<string, ActivationStats> {
    let results: Partial<Record<string, ActivationStats>> = {};
    const subsets: Expansion[][] = getAllSubsets(Object.keys(birdDeckCollection) as Expansion[]);

    for (const subset of subsets) {
        const subsetKey: string = subset.join('_')
        // combine decks
        const combinedCards = subset.flatMap(expansion =>
            birdDeckCollection[expansion]?.cards.filter(card => card.commonName !== ignoreCardName) ?? []
        );

        const totalCards = combinedCards.length;

        if (totalCards === 0 || drawCount === 0) {
            // nothing to do here
            continue;
        }

        // any success        
        const cardsWithTargetFood = combinedCards.filter(card => (card.food[target] === true));
        const pTargetFood = cardsWithTargetFood.length / totalCards;
        const pNoTargetFood = 1 - pTargetFood;
        const probAllNoTargetFood = Math.pow(pNoTargetFood, drawCount);

        const anySuccess = 1 - probAllNoTargetFood;
        const failure = probAllNoTargetFood;
        let distribution: Record<number, number> = {}
        distribution[0] = failure;
        distribution[1] = anySuccess;

        // expected value
        // linear expectation, using average of entire deck induces 'without replacement'. While
        // the probability of cost in the next card changes with each card being removed, the result 
        // remains linear regardless of (in)dependence of each draw: there is no decision boundary 
        // at any time, the number of cards is a constant and finite for all attempts
        const totalFoodCostofTarget = combinedCards.reduce((sum, card) => {
            const cost = card.food.foodCost[target];
            return sum + (cost ?? 0);
        }, 0);
        const averageFoodCostOfTarget = totalFoodCostofTarget / totalCards;
        const expectedValue = drawCount * averageFoodCostOfTarget;

        results[subsetKey] = {
            activationName,
            distribution,
            anySuccess,
            failure,
            expectedValue
        };
    }

    return results as Record<string, ActivationStats>;
}
