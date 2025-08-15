import { getDrawBinaryActivationStats } from "./helpers/getDrawBinaryActivationStats";
import type { Food, DrawCardTargets, BirdDeckCollection, ActivationStats, DrawActivationInput, DrawActivationResult, DrawCardActivations, Expansion } from "@customTypes";



export const birdsMatchFood: DrawActivationInput[] = [
    { birdName: 'Green Bee-Eater', targetType: 'Food', target: 'Invertebrate', drawCount: 3, activationResultMode: 'binary', fromTrayOnly: true },
    { birdName: 'Plumbeous Redstart', targetType: 'Food', target: ['Invertebrate', 'Seed'], drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },

]

export function matchFoodLogic(
    targetType: DrawCardTargets,
    target: Food | Food[],
    drawCount: number,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName: string
) {
    const activationName: DrawCardActivations = 'matchFood';
    return getDrawBinaryActivationStats(
        activationName,
        targetType,
        target,
        drawCount,
        birdDeckCollection,
        ignoreCardName
    )
}


export function getMatchFoodActivation(birdsMatchFood: DrawActivationInput[], birdDeckCollection: BirdDeckCollection): DrawActivationResult[] {
    let allBirdStats: DrawActivationResult[] = []
    for (let curBird of birdsMatchFood) {
        const curBirdStats: Record<number, Record<Expansion, ActivationStats>> = {};
        if (curBird.fromTrayOnly) {
            for (const thisManyBirdsInTheTray of Array.from({ length: curBird.drawCount }, (_, i) => i + 1)) {
                const curStats: Record<Expansion, ActivationStats> = matchFoodLogic(
                    curBird.targetType,
                    curBird.target as Food | Food[],
                    thisManyBirdsInTheTray,
                    birdDeckCollection,
                    curBird.birdName,
                )
                curBirdStats[thisManyBirdsInTheTray] = curStats
            }
        } else {
            curBirdStats[0] = matchFoodLogic(
                curBird.targetType,
                curBird.target as Food | Food[],
                curBird.drawCount,
                birdDeckCollection,
                curBird.birdName,
            )
        }
        let result: DrawActivationResult = {
            birdName: curBird.birdName,
            target: curBird.target as Food | Food[],
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