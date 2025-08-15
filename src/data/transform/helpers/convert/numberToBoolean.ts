// helper func to convert a number to a boolean
export function convertNumberToBoolean(value: number | undefined): boolean {
    // if null or zero return false, else true
    return (value ?? 0) > 0;
}