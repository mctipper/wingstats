import { birdsResetTheBirdfeeder, getResetTheBirdfeederActivations } from "@logic/diceActivations/resetTheBirdfeeder";



export function debug() {
    debugger;

    const results = getResetTheBirdfeederActivations(birdsResetTheBirdfeeder);

    debugger;

    return results
}