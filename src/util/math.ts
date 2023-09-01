export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);
