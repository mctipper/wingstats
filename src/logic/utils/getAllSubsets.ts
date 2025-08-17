
export function getAllSubsets<T>(items: T[]): T[][] {
    const result: T[][] = [];
    const total = 1 << items.length;

    for (let mask = 1; mask < total; mask++) {
        const subset: T[] = [];
        for (let i = 0; i < items.length; i++) {
            if (mask & (1 << i)) subset.push(items[i]);
        }
        result.push(subset);
    }

    return result;
}