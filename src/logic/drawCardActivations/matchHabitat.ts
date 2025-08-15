import { getDrawBinaryActivationStats } from "./helpers/getDrawBinaryActivationStats";
import type { Habitat, DrawCardTargets, BirdDeckCollection, ActivationStats, DrawActivationInput, DrawActivationResult, DrawCardActivations, Expansion } from "@customTypes";



export const birdsMatchHabitat: DrawActivationInput[] = [
    { birdName: 'Common Little Bittern', targetType: 'Habitat', target: 'Grassland', drawCount: 3, activationResultMode: 'binary', fromTrayOnly: true },
    { birdName: 'Squacco Heron', targetType: 'Habitat', target: 'Wetland', drawCount: 3, activationResultMode: 'binary', fromTrayOnly: true },
    { birdName: 'Little Egret', targetType: 'Habitat', target: 'Wetland', drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Rufous Night-Heron', targetType: 'Habitat', target: 'Wetland', drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
]



export function matchHabitatLogic(
    targetType: DrawCardTargets,
    target: Habitat,
    drawCount: number,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName: string
) {
    const activationName: DrawCardActivations = 'matchHabitat';
    return getDrawBinaryActivationStats(
        activationName,
        targetType,
        target,
        drawCount,
        birdDeckCollection,
        ignoreCardName
    )
}


export function getMatchHabitatActivation(birdsMatchHabitat: DrawActivationInput[], birdDeckCollection: BirdDeckCollection): DrawActivationResult[] {
    let allBirdStats: DrawActivationResult[] = []
    for (let curBird of birdsMatchHabitat) {
        const curBirdStats: Record<number, Record<Expansion, ActivationStats>> = {};
        if (curBird.fromTrayOnly) {
            for (const thisManyBirdsInTheTray of Array.from({ length: curBird.drawCount }, (_, i) => i + 1)) {
                const curStats: Record<Expansion, ActivationStats> = matchHabitatLogic(
                    curBird.targetType,
                    curBird.target as Habitat,
                    thisManyBirdsInTheTray,
                    birdDeckCollection,
                    curBird.birdName,
                )
                curBirdStats[thisManyBirdsInTheTray] = curStats
            }
        } else {
            curBirdStats[0] = matchHabitatLogic(
                curBird.targetType,
                curBird.target as Habitat,
                curBird.drawCount,
                birdDeckCollection,
                curBird.birdName,
            )
        }
        let result: DrawActivationResult = {
            birdName: curBird.birdName,
            target: curBird.target as Habitat,
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