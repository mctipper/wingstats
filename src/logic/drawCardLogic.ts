import type { Expansion, BirdDeckCollection, DrawActivationTargetMap } from "@customTypes";
import type { DrawCardTargets } from "@customTypes"
import { binomialCoefficient } from "@logic/utils/binomialCoefficient";
import { matchFood, matchHabitat, matchNest, matchPredator, matchWingspan } from "@logic/drawCardActivations/helpers/targetMatches";

function getAllSubsets<T>(items: T[]): T[][] {
    const result: T[][] = [];
    const total = 1 << items.length;

    for (let mask = 1; mask < total; mask++) {
        const subset: T[] = [];
        for (let i = 0; i < items.length; i++) {
            if (mask & (1 << i)) subset.push(items[i]);
        }
        result.push(subset);
    }

    return result;
}

export function getDrawOddsByDeck<T extends DrawCardTargets>(
    targetType: T,
    target: DrawActivationTargetMap[T],
    birdDeckCollection: BirdDeckCollection,
    drawCount: number,
    ignoreCardName?: string
): Record<string, number> {
    const result: Partial<Record<string, number>> = {};
    const subsets = getAllSubsets(Object.keys(birdDeckCollection) as Expansion[]);

    for (const subset of subsets) {
        const subsetKey: string = subset.join('_')
        // combine decks
        const combinedCards = subset.flatMap(expansion =>
            birdDeckCollection[expansion]?.cards.filter(card => card.commonName !== ignoreCardName) ?? []
        );

        const totalCards = combinedCards.length;

        if (totalCards === 0 || drawCount === 0) {
            result[subsetKey] = 0;
            continue;
        }

        const matchCount = combinedCards.filter(card => {
            switch (targetType) {
                case 'Habitat': return matchHabitat(card, target as DrawActivationTargetMap['Habitat']);
                case 'Food': return matchFood(card, target as DrawActivationTargetMap['Food']);
                case 'Nest': return matchNest(card, target as DrawActivationTargetMap['Nest']);
                case 'Wingspan': return matchWingspan(card, target as DrawActivationTargetMap['Wingspan']);
                case 'Predator': return matchPredator(card, target as DrawActivationTargetMap['Predator']);
                default: return false;
            }
        }).length;

        const nonMatchCount = totalCards - matchCount;
        const k = Math.min(drawCount, totalCards);

        const odds =
            k > nonMatchCount
                ? 1
                : 1 - binomialCoefficient(nonMatchCount, k) / binomialCoefficient(totalCards, k);

        result[subsetKey] = odds;
    }

    return result as Record<string, number>;
}
