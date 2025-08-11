import type { BonusCards, BonusCardInfo } from "../../../types/BonusCards";


export function createBonusCardInfo(bc: BonusCards): BonusCardInfo {
    const bonusCardCount = Object.values(bc).filter(Boolean).length;
    return { ...bc, bonusCardCount }
}
