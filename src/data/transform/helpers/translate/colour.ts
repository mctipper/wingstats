import type { Colour } from "@customTypes";

// damn TS and its runtime/compiletime inequality
export const validColours: Colour[] = ['None', 'White', 'Brown', 'Pink', 'Teal', 'Yellow'];

export function translateColour(rawColour: string | null): Colour {
    if (rawColour === null) return 'None';

    if (validColours.includes(rawColour as Colour)) {
        return rawColour as Colour;
    };

    // yep again purposefully abort
    throw new Error(`Unexpected "color" property: ${rawColour}`)
}
