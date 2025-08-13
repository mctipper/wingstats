import { resetTheBirdfeeder } from '@logic/diceActivations/resetTheBirdfeeder';
import { baseGameDie } from '@definitions/diceDefinitions';
import type { ActivationStats } from '@customTypes';


export function debug(): any {
    debugger;

    const blackNoddy: ActivationStats = resetTheBirdfeeder(
        baseGameDie,
        'Fish',
        'binomial'
    );

    const europeanBeeEater: ActivationStats = resetTheBirdfeeder(
        baseGameDie,
        'Invertebrate',
        'binary'
    )

    const europeanHoneyBuzzard: ActivationStats = resetTheBirdfeeder(
        baseGameDie,
        'Invertebrate',
        'binomial'
    )

    const laughingKookaburra: ActivationStats = resetTheBirdfeeder(
        baseGameDie,
        ['Fish', 'Invertebrate', 'Rodent'],
        'binary'
    )

    debugger;

    return {
        'blackNoddy': blackNoddy,
        'europeanBeeEater': europeanBeeEater,
        'europeanHoneyBuzzard': europeanHoneyBuzzard,
        'laughingKookaburra': laughingKookaburra
    }
}
