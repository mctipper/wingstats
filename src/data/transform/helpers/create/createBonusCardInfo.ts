import type {
    BonusCards,
    BonusCardInfo
} from "@customTypes";


export function createBonusCardInfo(bc: BonusCards): BonusCardInfo {
    const bonusCardCount = Object.values(bc).filter(Boolean).length;
    return { ...bc, bonusCardCount }
}
