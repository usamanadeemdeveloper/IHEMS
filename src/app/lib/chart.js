const PERCENT = (value) => value !== null ? Math.min(value / max, 1) : 0;
export const STROCK_DASH_ARRAY = 440; // Circle circumference (2 * π * r ≈ 2 * 3.14 * 70)
export const DASHOFFSET = STROCK_DASH_ARRAY * (1 - PERCENT);