import { getPushYourLuckWingspanExactJustOneMoreActivationStats } from "./helpers/getDrawWingspanExactJustOneMoreActivationStats";
import type { BirdDeckCollection, ActivationStats, DrawActivationInput, DrawActivationResult, WingspanOperator } from "@customTypes";



export const birdsPushYourLuckWingspanJustOneMore: DrawActivationInput[] = [
    { birdName: 'Eurasian Eagle-Owl', targetType: 'Wingspan', target: { op: '<', value: 110 }, drawCount: 3, activationResultMode: 'wingspanCDF', fromTrayOnly: false },
    { birdName: 'Eurasian Marsh-Harrier', targetType: 'Wingspan', target: { op: '<', value: 110 }, drawCount: 3, activationResultMode: 'wingspanCDF', fromTrayOnly: false },
]



export function pushYourLuckWingspanJustOneMoreLogic(
    sumSoFar: number,
    alreadyDrawn: number,
    target: WingspanOperator,
    birdDeckCollection: BirdDeckCollection,
    ignoreCardName: string
) {
    return getPushYourLuckWingspanExactJustOneMoreActivationStats(
        sumSoFar,
        alreadyDrawn,
        target,
        birdDeckCollection,
        ignoreCardName
    )
}


export function getPushYourLuckWingspanJustOneMoreActivation(birdsPushYourLuckWingspanJustOneMore: DrawActivationInput[], birdDeckCollection: BirdDeckCollection): DrawActivationResult[] {
    let allBirdStats: DrawActivationResult[] = []
    for (let curBird of birdsPushYourLuckWingspanJustOneMore) {
        const curBirdStats: Record<string, Record<string, ActivationStats>> = {};
        const sumSoFar: number[] = [8, 15, 30, 60, 95, 100, 102, 111]
        const alreadyDrawn: number[] = [1, 2]
        for (const ssf of sumSoFar) {
            for (const ad of alreadyDrawn) {
                const thisKey = `${ssf}_${ad}`
                const curStats: Record<string, ActivationStats> = pushYourLuckWingspanJustOneMoreLogic(
                    ssf,
                    ad,
                    curBird.target as WingspanOperator,
                    birdDeckCollection,
                    curBird.birdName,
                )
                curBirdStats[thisKey] = curStats
            }
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