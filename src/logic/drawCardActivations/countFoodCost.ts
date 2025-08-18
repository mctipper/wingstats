import { getDrawFoodCountActivationStats } from "./helpers/getDrawFoodCountActivationStats";
import type { Food, BirdDeckCollection, ActivationStats, DrawActivationInput, DrawActivationResult, DrawCardActivations, Expansion } from "@customTypes";



export const birdsCountFoodCost: DrawActivationInput[] = [
    { birdName: 'Little Penguin', targetType: 'Food', target: 'Fish', drawCount: 5, activationResultMode: 'sum', fromTrayOnly: false },

]

export function matchCountFoodLogic(
    target: Food,
    drawCount: number,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName: string
) {
    const activationName: DrawCardActivations = 'countFoodCost';
    return getDrawFoodCountActivationStats(
        activationName,
        target,
        drawCount,
        birdDeckCollection,
        ignoreCardName
    )
}


export function getCountFoodActivation(birdsMatchFood: DrawActivationInput[], birdDeckCollection: BirdDeckCollection): DrawActivationResult[] {
    let allBirdStats: DrawActivationResult[] = []
    for (let curBird of birdsMatchFood) {
        const curBirdStats: Record<number, Record<Expansion, ActivationStats>> = {};
        if (curBird.fromTrayOnly) {
            for (const thisManyBirdsInTheTray of Array.from({ length: curBird.drawCount }, (_, i) => i + 1)) {
                const curStats: Record<Expansion, ActivationStats> = matchCountFoodLogic(
                    curBird.target as Food,
                    thisManyBirdsInTheTray,
                    birdDeckCollection,
                    curBird.birdName,
                )
                curBirdStats[thisManyBirdsInTheTray] = curStats
            }
        } else {
            curBirdStats[0] = matchCountFoodLogic(
                curBird.target as Food,
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