export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export const Direction = {
    east: 1 << 0,
    north: 1 << 3,
    south: 1 << 1,
    west: 1 << 2,
};