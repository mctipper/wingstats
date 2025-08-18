import { getDrawWingspanCDFActivationStats } from "./helpers/getDrawWingspanCDFActivationStats";
import type { BirdDeckCollection, ActivationStats, DrawActivationInput, DrawActivationResult, DrawCardActivations, WingspanOperator } from "@customTypes";



export const birdsPushYourLuckWingspan: DrawActivationInput[] = [
    { birdName: 'Eurasian Eagle-Owl', targetType: 'Wingspan', target: { op: '<', value: 110 }, drawCount: 3, activationResultMode: 'wingspanCDF', fromTrayOnly: false },
    { birdName: 'Eurasian Marsh-Harrier', targetType: 'Wingspan', target: { op: '<', value: 110 }, drawCount: 3, activationResultMode: 'wingspanCDF', fromTrayOnly: false },
]



export function pushYourLuckWingspanLogic(
    target: WingspanOperator,
    drawCount: number,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName: string
) {
    const activationName: DrawCardActivations = 'pushYourLuckWingspan';
    return getDrawWingspanCDFActivationStats(
        activationName,
        target,
        drawCount,
        birdDeckCollection,
        ignoreCardName
    )
}


export function getPushYourLuckWingspanActivation(birdsPushYourLuckWingspan: DrawActivationInput[], birdDeckCollection: BirdDeckCollection): DrawActivationResult[] {
    let allBirdStats: DrawActivationResult[] = []
    for (let curBird of birdsPushYourLuckWingspan) {
        const curBirdStats: Record<number, Record<string, ActivationStats>> = {};
        for (const thisStopTactic of Array.from({ length: curBird.drawCount }, (_, i) => i + 1)) {
            const curStats: Record<string, ActivationStats> = pushYourLuckWingspanLogic(
                curBird.target as WingspanOperator,
                thisStopTactic,
                birdDeckCollection,
                curBird.birdName,
            )
            curBirdStats[thisStopTactic] = curStats
        }
        let result: DrawActivationResult = {
            birdName: curBird.birdName,
            target: curBird.target as WingspanOperator,
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