export const minutesElapsed: (t1: Date, t2: Date) => number = (t1: Date, t2: Date): number => Math.abs(t1.valueOf() - t2.valueOf()) / 60000;
