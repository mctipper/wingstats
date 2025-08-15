import { getDrawBinaryActivationStats } from "./helpers/getDrawBinaryActivationStats";
import type { DrawCardTargets, BirdDeckCollection, ActivationStats, DrawActivationInput, DrawActivationResult, DrawCardActivations, Expansion } from "@customTypes";



export const birdsMatchWingspan: DrawActivationInput[] = [
    { birdName: 'Barred Owl', targetType: 'Wingspan', target: { op: '<', value: 75 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Cooper\'s Hawk', targetType: 'Wingspan', target: { op: '<', value: 75 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Golden Eagle', targetType: 'Wingspan', target: { op: '<', value: 100 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Great Horned Owl', targetType: 'Wingspan', target: { op: '<', value: 100 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Greater Roadrunner', targetType: 'Wingspan', target: { op: '<', value: 50 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Northern Harrier', targetType: 'Wingspan', target: { op: '<', value: 75 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Peregrine Falcon', targetType: 'Wingspan', target: { op: '<', value: 100 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Red-Shouldered Hawk', targetType: 'Wingspan', target: { op: '<', value: 75 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Red-Tailed Hawk', targetType: 'Wingspan', target: { op: '<', value: 75 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Rufous Owl', targetType: 'Wingspan', target: { op: '<', value: 75 }, drawCount: 3, activationResultMode: 'binary', fromTrayOnly: true },
    { birdName: 'Swainson\'s Hawk', targetType: 'Wingspan', target: { op: '<', value: 75 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false },
    { birdName: 'Wedge-Tailed Eagle', targetType: 'Wingspan', target: { op: '>', value: 65 }, drawCount: 1, activationResultMode: 'binary', fromTrayOnly: false }
]



export function matchWingspanLogic(
    targetType: DrawCardTargets,
    target: boolean,
    drawCount: number,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName: string
) {
    const activationName: DrawCardActivations = 'matchWingspan';
    return getDrawBinaryActivationStats(
        activationName,
        targetType,
        target,
        drawCount,
        birdDeckCollection,
        ignoreCardName
    )
}


export function getMatchWingspanActivation(birdsMatchWingspan: DrawActivationInput[], birdDeckCollection: BirdDeckCollection): DrawActivationResult[] {
    let allBirdStats: DrawActivationResult[] = []
    for (let curBird of birdsMatchWingspan) {
        const curBirdStats: Record<number, Record<Expansion, ActivationStats>> = {};
        if (curBird.fromTrayOnly) {
            for (const thisManyBirdsInTheTray of Array.from({ length: curBird.drawCount }, (_, i) => i + 1)) {
                const curStats: Record<Expansion, ActivationStats> = matchWingspanLogic(
                    curBird.targetType,
                    curBird.target as boolean,
                    thisManyBirdsInTheTray,
                    birdDeckCollection,
                    curBird.birdName,
                )
                curBirdStats[thisManyBirdsInTheTray] = curStats
            }
        } else {
            curBirdStats[0] = matchWingspanLogic(
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