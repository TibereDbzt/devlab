export const wrapRange = (value: number, min: number, max: number): number => value >= 0 ? min + (value - min) % (max - min) : min + ((value - min) % (max - min) + (max - min)) % (max - min)
