export function formatTargetFood(targetFood: string | string[]): string {
    if (Array.isArray(targetFood)) {
        const len = targetFood.length
        if (len === 0) return ''
        if (len === 1) return targetFood[0]
        if (len === 2) return `${targetFood[0]} or ${targetFood[1]}`
        return `${targetFood.slice(0, -1).join(', ')}, or ${targetFood[len - 1]}`
    }
    return targetFood
}