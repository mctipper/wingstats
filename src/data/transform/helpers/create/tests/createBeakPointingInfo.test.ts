import { describe, it, expect } from 'vitest';
import { createBeakPointingInfo } from '../createBeakPointingInfo';
import type { BeakPointing, BeakPointingInfo } from '@customTypes/BeakPointing';

describe('createBeakPointingInfo', () => {
    it('returns both = true and neither = false when both left and right are true', () => {
        const input: BeakPointing = { left: true, right: true };
        const result: BeakPointingInfo = createBeakPointingInfo(input);
        expect(result).toEqual({ left: true, right: true, both: true, neither: false });
    });

    it('returns both = false and neither = true when both left and right are false', () => {
        const input: BeakPointing = { left: false, right: false };
        const result: BeakPointingInfo = createBeakPointingInfo(input);
        expect(result).toEqual({ left: false, right: false, both: false, neither: true });
    });

    it('returns both = false and neither = false when only left is true', () => {
        const input: BeakPointing = { left: true, right: false };
        const result: BeakPointingInfo = createBeakPointingInfo(input);
        expect(result).toEqual({ left: true, right: false, both: false, neither: false });
    });

    it('returns both = false and neither = false when only right is true', () => {
        const input: BeakPointing = { left: false, right: true };
        const result: BeakPointingInfo = createBeakPointingInfo(input);
        expect(result).toEqual({ left: false, right: true, both: false, neither: false });
    });
});
