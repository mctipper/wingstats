import { birdsWithRollAnyXDice, getRollAnyXDiceBirdActivations } from "@computed/diceActivations/rollAnyXDieActivation";

export function debug(): any {
    debugger;

    const result = getRollAnyXDiceBirdActivations(birdsWithRollAnyXDice);

    debugger;

    return result;
}