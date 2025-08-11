export type BeakPointing = {
    left: boolean;
    right: boolean;
}

export type BeakPointingInfo = BeakPointing & {
    both: boolean;
    neither: boolean;
}