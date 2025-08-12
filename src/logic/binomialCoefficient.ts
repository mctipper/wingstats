export function binomialCoefficient(n: number, k: number): number {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;

    let coeff = 1;
    for (let i = 1; i <= k; i++) {
        coeff *= (n - i + 1) / i;
    }
    return coeff;
}