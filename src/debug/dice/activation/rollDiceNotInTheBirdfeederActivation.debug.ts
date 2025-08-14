import { birdsRollDiceNotInTheBirdfeeder, getRollDiceNotInTheBirdfeederActivation } from "@logic/diceActivations/rollDiceNotInTheBirdfeeder";



export function debug() {
    debugger;

    const results = getRollDiceNotInTheBirdfeederActivation(birdsRollDiceNotInTheBirdfeeder);

    debugger;

    return results
}