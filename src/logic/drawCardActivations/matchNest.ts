import { getDrawBinaryActivationStats } from "./helpers/getDrawBinaryActivationStats";
import type { Nest, DrawCardTargets, BirdDeckCollection, ActivationStats, DrawActivationInput, DrawActivationResult, DrawCardActivations, Expansion } from "@customTypes";



export const birdsMatchNest: DrawActivationInput[] = [
    { birdName: 'Australian Shelduck', targetType: 'Nest', target: 'Cavity', drawCount: 3, activationResultMode: 'binary', fromTrayOnly: true },
    { birdName: 'Musk Duck', targetType: 'Nest', target: 'Ground', drawCount: 3, activationResultMode: 'binary', fromTrayOnly: true },
    { birdName: 'Royal Spoonbill', targetType: 'Nest', target: 'Platform', drawCount: 3, activationResultMode: 'binary', fromTrayOnly: true },
    { birdName: 'Willie-Wagtail', targetType: 'Nest', target: 'Bowl', drawCount: 3, activationResultMode: 'binary', fromTrayOnly: true },
]



export function matchNestLogic(
    targetType: DrawCardTargets,
    target: Nest | Nest[],
    drawCount: number,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName: string
) {
    const activationName: DrawCardActivations = 'matchNest';
    return getDrawBinaryActivationStats(
        activationName,
        targetType,
        target,
        drawCount,
        birdDeckCollection,
        ignoreCardName
    )
}


export function getMatchNestActivation(birdsMatchNest: DrawActivationInput[], birdDeckCollection: BirdDeckCollection): DrawActivationResult[] {
    let allBirdStats: DrawActivationResult[] = []
    for (let curBird of birdsMatchNest) {
        const curBirdStats: Record<number, Record<Expansion, ActivationStats>> = {};
        if (curBird.fromTrayOnly) {
            for (const thisManyBirdsInTheTray of Array.from({ length: curBird.drawCount }, (_, i) => i + 1)) {
                const curStats: Record<Expansion, ActivationStats> = matchNestLogic(
                    curBird.targetType,
                    curBird.target as Nest | Nest[],
                    thisManyBirdsInTheTray,
                    birdDeckCollection,
                    curBird.birdName,
                )
                curBirdStats[thisManyBirdsInTheTray] = curStats
            }
        } else {
            curBirdStats[0] = matchNestLogic(
                curBird.targetType,
                curBird.target as Nest | Nest[],
                curBird.drawCount,
                birdDeckCollection,
                curBird.birdName,
            )
        }
        let result: DrawActivationResult = {
            birdName: curBird.birdName,
            target: curBird.target as Nest | Nest[],
            targetType: curBird.targetType,
            drawCount: curBird.drawCount,
            fromTrayOnly: curBird.fromTrayOnly,
            activationResultMode: curBird.activationResultMode,
            activationStats: curBirdStats
        }
        allBirdStats.push(result)
    }
    return allBirdStats
};