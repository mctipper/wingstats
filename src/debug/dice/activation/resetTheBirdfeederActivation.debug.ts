import { birdsResetTheBirdfeeder, getResetTheBirdfeederActivations } from "@computed/diceActivations/resetTheBirdfeederActivation";



export function debug() {
    debugger;

    const results = getResetTheBirdfeederActivations(birdsResetTheBirdfeeder);

    debugger;

    return results
}