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