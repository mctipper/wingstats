import type { Habitats, HabitatInfo } from "../types/Habitats";
import type { Expansions } from "../types/Expansions";
import type { Colour } from "../types/Colour";
import type { Nest } from "../types/Nest";
import type { BonusCardInfo, BonusCards } from "../types/BonusCards";
import type { BeakPointing, BeakPointingInfo } from "../types/BeakPointing";


// helper func to convert X to Boolean
export const convertFlagToBoolean = (value: string | undefined): boolean => value === 'X';

// helper func to convert null to zero number
export const convertNullToZero = (value: number | undefined): number => !value ? 0 : value;


export function createHabitatInfo(h: Habitats): HabitatInfo {
    const multipleHabitats = Object.values(h).filter(Boolean).length > 1;
    return { ...h, multipleHabitats };
}

export function createBonusCardInfo(bc: BonusCards): BonusCardInfo {
    const bonusCardCount = Object.values(bc).filter(Boolean).length;
    return { ...bc, bonusCardCount }
}

export function createBeakPointingInfo(bp: BeakPointing): BeakPointingInfo {
    const neither = Object.values(bp).filter(Boolean).length === 0;
    return { ...bp, neither }
}

export function translateExpansion(rawExpansion: string): Expansions {
    switch (rawExpansion) {
        case "originalcore":
        case "swiftstart":
            return 'BaseGame';
        case "european":
            return 'European';
        case "oceania":
            return 'Oceania';
        case "asia":
            return 'Asia';
        default:
            // yes we want this to abort the process, will need to be addressed directly
            throw new Error(`Unexpected "expansion" property: ${rawExpansion}`)
    }
}

export function translateColour(rawColour: string | null): Colour {
    if (rawColour === null) return 'None';

    // damn TS and its runtime/compiletime inequality
    const validColours: Colour[] = ['None', 'White', 'Brown', 'Pink', 'Teal', 'Yellow'];

    if (validColours.includes(rawColour as Colour)) {
        return rawColour as Colour;
    };

    // yep again purposefully abort
    throw new Error(`Unexpected "color" property: ${rawColour}`)
}

export function translateNest(rawNest: string): Nest {
    switch (rawNest) {
        case "Wild":
            return "Star";
        case "None":
        case "Cavity":
        case "Platform":
        case "Ground":
        case "Bowl":
            return rawNest
        default:
            // yep again purposefully abort
            throw new Error(`Unexpected "Nest" property: ${rawNest}`)
    }
}

export function translateWingspan(rawWingspan: string): number {
    if (rawWingspan === "*") {
        return 0
    }

    const wingspan = Number(rawWingspan)

    if (Number.isNaN(wingspan)) {
        throw Error(`Unexpected non-number for Wingspan: ${rawWingspan}`)
    }

    return wingspan;
}