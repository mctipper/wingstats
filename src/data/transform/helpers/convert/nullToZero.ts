// helper func to convert null to zero number
export const convertNullToZero = (value: number | undefined): number => !value ? 0 : value;
