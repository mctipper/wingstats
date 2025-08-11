import type { Colour } from "@customTypes/Colour";


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
