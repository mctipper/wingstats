import type { ActivationStats, DrawCardTargets, DrawActivationTargetMap, DrawCardActivations, BirdDeckCollection, Expansion } from '@customTypes';
import { getDrawOddsByDeck } from '@logic/drawCardLogic'



export function getDrawBinaryActivationStats<T extends DrawCardTargets>(
    activationName: DrawCardActivations,
    targetType: T,
    target: DrawActivationTargetMap[T],
    drawCount: number,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName?: string
): Record<string, ActivationStats> {
    // Binary Activation, any number of success is counted as 1
    const singleSuccessProbByDeck = getDrawOddsByDeck(
        targetType,
        target,
        birdDeckCollection,
        drawCount,
        ignoreCardName
    )
    let results: Record<string, ActivationStats> = {} as Record<Expansion, ActivationStats>

    for (const [expansion_combine, odds] of Object.entries(singleSuccessProbByDeck) as [string, number][]) {
        results[expansion_combine] = {
            activationName: activationName,
            distribution: {
                0: 1 - odds,
                1: odds
            },
            anySuccess: odds,
            failure: 1 - odds,
            expectedValue: odds
        }
    }
    return results;
}
