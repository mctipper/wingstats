// helper func to convert string "X" to Boolean
export const convertFlagToBoolean = (value: string | undefined): boolean => value === 'X';

// helper func to convert null to zero number
export const convertNullToZero = (value: number | undefined): number => !value ? 0 : value;
