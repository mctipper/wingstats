import { getDrawBinaryActivationStats } from "./helpers/getDrawBinaryActivationStats";
import type { DrawCardTargets, BirdDeckCollection, ActivationStats, DrawActivationInput, DrawActivationResult, DrawCardActivations, Expansion } from "@customTypes";



export const birdsMatchPredator: DrawActivationInput[] = [
    { birdName: 'Red-Wattled Lapwing', targetType: 'Predator', target: true, drawCount: 3, activationResultMode: 'binary', fromTrayOnly: true },
    { birdName: 'Red-Wattled Lapwing', targetType: 'Predator', target: true, drawCount: 3, activationResultMode: 'binary', fromTrayOnly: false },
]



export function matchPredatorLogic(
    targetType: DrawCardTargets,
    target: boolean,
    drawCount: number,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName: string
) {
    const activationName: DrawCardActivations = 'matchPredator';
    return getDrawBinaryActivationStats(
        activationName,
        targetType,
        target,
        drawCount,
        birdDeckCollection,
        ignoreCardName
    )
}



export function getMatchPredatorActivation(birdsMatchPredator: DrawActivationInput[], birdDeckCollection: BirdDeckCollection): DrawActivationResult[] {
    let allBirdStats: DrawActivationResult[] = []
    for (let curBird of birdsMatchPredator) {
        const curBirdStats: Record<number, Record<Expansion, ActivationStats>> = {};
        if (curBird.fromTrayOnly) {
            for (const thisManyBirdsInTheTray of Array.from({ length: curBird.drawCount }, (_, i) => i + 1)) {
                const curStats: Record<Expansion, ActivationStats> = matchPredatorLogic(
                    curBird.targetType,
                    curBird.target as boolean,
                    thisManyBirdsInTheTray,
                    birdDeckCollection,
                    curBird.birdName,
                )
                curBirdStats[thisManyBirdsInTheTray] = curStats
            }
        } else {
            curBirdStats[0] = matchPredatorLogic(
                curBird.targetType,
                curBird.target as boolean,
                curBird.drawCount,
                birdDeckCollection,
                curBird.birdName,
            )
        }
        let result: DrawActivationResult = {
            birdName: curBird.birdName,
            target: curBird.target as boolean,
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