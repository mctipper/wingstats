import type {
    ActivationStats,
    BirdDeckCollection,
    Expansion,
    WingspanOperator
} from '@customTypes';
import { getAllSubsets } from '@logic/utils/getAllSubsets';

export function getPushYourLuckWingspanExactJustOneMoreActivationStats(
    sumSoFar: number,
    alreadyDrawn: number,
    target: WingspanOperator,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName: string
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

        if (totalCards === 0) {
            // nothing to do here
            continue;
        }

        if (sumSoFar > target.value) {
            console.warn(`sumSoFar value ${sumSoFar} already > bust value ${target.value} - computing anyway as a proof`)
        }

        // this is done empericallly with finite outcomes as probability distribtuions (statistically correctly) provide
        //  probablites for impossible scenarios (ie when sum is already 109 odds of <110 are >0 because 0.x exists 
        // in the distribution)
        let bustingCards = 0;
        for (const card of combinedCards) {
            const newSum = sumSoFar + card.wingspan;
            if (newSum > target.value) {
                bustingCards++;
            }
        }

        const safeCards = totalCards - bustingCards;
        const bustProbability = bustingCards / totalCards;
        const safeProbability = safeCards / totalCards;

        let distribution: Record<number, number> = {}
        distribution[0] = bustProbability;
        distribution[alreadyDrawn + 1] = safeProbability;
        const expectedValue = (alreadyDrawn + 1) * safeProbability

        results[subsetKey] = {
            activationName: 'pushYourLuckWingspan',
            distribution,
            anySuccess: safeProbability,
            failure: bustProbability,
            expectedValue
        };
    }

    return results as Record<string, ActivationStats>;
}
