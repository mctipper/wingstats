import type { Expansion, BirdDeckCollection, DrawActivationTargetMap } from "@customTypes";
import type { DrawCardTargets } from "@customTypes"
import { binomialCoefficient } from "@logic/utils/binomialCoefficient";
import { matchFood, matchHabitat, matchNest, matchPredator, matchWingspan } from "@logic/drawCardActivations/helpers/targetMatches";

export function getDrawOddsByDeck<T extends DrawCardTargets>(
    targetType: T,
    target: DrawActivationTargetMap[T],
    birdDeckCollection: BirdDeckCollection,
    drawCount: number,
    ignoreCardName?: string
): Record<Expansion, number> {
    const result: Partial<Record<Expansion, number>> = {};

    for (const expansion of Object.keys(birdDeckCollection) as Expansion[]) {
        const deck = birdDeckCollection[expansion];
        const cards = deck.cards.filter(card => card.commonName !== ignoreCardName);
        const totalCards = cards.length;

        // early exit
        if (totalCards === 0 || drawCount === 0) {
            result[expansion] = 0;
            continue;
        }

        const matchCount = cards.filter(card => {
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

        // minimise to ensure computation
        const k = Math.min(drawCount, totalCards);

        const odds =
            k > nonMatchCount
                ? 1
                : 1 - binomialCoefficient(nonMatchCount, k) / binomialCoefficient(totalCards, k);

        result[expansion] = odds;
    }

    return result as Record<Expansion, number>;
}