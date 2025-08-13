import { rollAnyXDiceLogic } from '@logic/diceActivations/rollAnyXDieLogic';
import { baseGameDie, oceaniaDie } from '@definitions/diceDefinitions';
import type { ActivationStats } from '@customTypes';


export function debug(): any {
    debugger;

    const greatCormorant: ActivationStats = rollAnyXDiceLogic(
        baseGameDie,
        'Fish',
        2,
        'binary'
    )

    const sriLankaFrogmouth: ActivationStats = rollAnyXDiceLogic(
        oceaniaDie,
        'Invertebrate',
        1,
        'binary'
    )

    debugger;

    return { 'greatCormarant': greatCormorant, sriLankaFrogmouth: sriLankaFrogmouth }
}
