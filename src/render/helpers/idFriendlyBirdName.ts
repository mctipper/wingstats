
export function idFriendlyBirdname(birdName: string): string {
    return `${birdName.replace(/\s+/g, '-')}`
}