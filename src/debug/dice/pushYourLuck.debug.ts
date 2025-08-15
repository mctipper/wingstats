import { birdsPushYourLuck, getPushYourLuckActivation } from "@logic/diceActivations/pushYourLuck";



export function debug() {
    debugger;

    const results = getPushYourLuckActivation(birdsPushYourLuck);

    debugger;

    return results
}