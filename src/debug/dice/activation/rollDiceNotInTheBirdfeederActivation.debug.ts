import { birdsRollDiceNotInTheBirdfeeder, getRollDiceNotInTheBirdfeederActivation } from "@computed/diceActivations/rollDiceNotInTheBirdfeederActivation";



export function debug() {
    debugger;

    const results = getRollDiceNotInTheBirdfeederActivation(birdsRollDiceNotInTheBirdfeeder);

    debugger;

    return results
}