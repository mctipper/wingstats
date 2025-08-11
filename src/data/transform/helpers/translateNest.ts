import type { Nest } from "@customTypes/Nest";


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