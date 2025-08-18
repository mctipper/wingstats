declare module 'jstat' {
    const jStat: {
        mean: (arr: number[]) => number;
        variance: (arr: number[], flag?: boolean) => number;
        normal: {
            cdf: (x: number, mean: number, stdDev: number) => number;
            inv: (p: number, mean: number, stdDev: number) => number;
        };
    };
    export = jStat;
}
