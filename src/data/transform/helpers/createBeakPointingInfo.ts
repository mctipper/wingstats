import type { BeakPointing, BeakPointingInfo } from "@types/BeakPointing";


export function createBeakPointingInfo(bp: BeakPointing): BeakPointingInfo {
    const both = Object.values(bp).filter(Boolean).length === 2;
    const neither = Object.values(bp).filter(Boolean).length === 0;
    return { ...bp, both, neither }
}
