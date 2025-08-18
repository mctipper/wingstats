import jStat from 'jstat';
import type {
    ActivationStats,
    DrawCardActivations,
    BirdDeckCollection,
    Expansion,
    WingspanOperator
} from '@customTypes';
import { getAllSubsets } from '@logic/utils/getAllSubsets';


export function getDrawWingspanCDFActivationStats(
    activationName: DrawCardActivations,
    target: WingspanOperator,
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

        const n = combinedCards.length;
        const wingspans = combinedCards.map(card => card.wingspan);
        const mean = jStat.mean(wingspans);
        const variance = jStat.variance(wingspans, true); // population variance
        const correction = 1 - (drawCount - 1) / (n - 1);
        const stdDev = Math.sqrt(drawCount * variance * correction);
        const sumMean = drawCount * mean;

        // as this is a distribution, will provide results for 'impossible scenarios' like totalWingspan < 10 from 3 birds
        // P(wingspanSum < target)
        const prob = jStat.normal.cdf(target.value, sumMean, stdDev);

        const anySuccess = prob;
        const failure = 1 - prob;
        const expectedValue = drawCount * prob;
        let distribution: Record<number, number> = {}
        distribution[0] = failure;
        distribution[drawCount] = prob;

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
