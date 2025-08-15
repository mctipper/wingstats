import { birdsMaskedLapwing, getMaskedLapwingActivation } from '@logic/diceActivations/maskedLapwing'



export function debug() {
    debugger;

    const results = getMaskedLapwingActivation(birdsMaskedLapwing);

    debugger;

    return results
}