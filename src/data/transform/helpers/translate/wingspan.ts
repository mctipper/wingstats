export function translateWingspan(rawWingspan: string): number {
    if (rawWingspan === "*") {
        return 0
    }

    const wingspan = Number(rawWingspan)

    // string check
    if (Number.isNaN(wingspan) || rawWingspan === "") {
        throw Error(`Unexpected non-number for Wingspan: ${rawWingspan === "" ? "(empty string)" : rawWingspan}`)
    }

    return wingspan;
}