import type { Expansions } from "@customTypes/Expansions";


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