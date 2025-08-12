import { rollAnyXDice } from '@logic/diceActivations/rollAnyXDie';
import { baseGameDie, oceaniaDie } from '@definitions/diceDefinitions';
import type { ActivationStats } from '@customTypes';


export function debug(): any {
    debugger;

    const greatCormorant: ActivationStats = rollAnyXDice(
        baseGameDie,
        'Fish',
        2,
        'binary'
    )

    const sriLankaFrogmouth: ActivationStats = rollAnyXDice(
        oceaniaDie,
        'Invertebrate',
        1,
        'binary'
    )

    debugger;

    return { 'greatCormarant': greatCormorant, sriLankaFrogmouth: sriLankaFrogmouth }
}
