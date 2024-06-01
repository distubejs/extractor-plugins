export const clone = <T>(obj: T): T => {
  const result: T = <T>(Array.isArray(obj) ? [] : {});
  for (const key in obj) {
    result[key] = typeof obj[key] === "object" ? clone(obj[key]) : obj[key];
  }
  return result;
};

/**
 * Convert formatted duration to seconds
 * @param input - Formatted duration string
 */
export function toSecond(input: any): number {
  if (!input) return 0;
  if (typeof input !== "string") return Number(input) || 0;
  if (input.includes(":")) {
    const time = input.split(":").reverse();
    let seconds = 0;
    for (let i = 0; i < 3; i++) if (time[i]) seconds += Number(time[i].replace(/[^\d.]+/g, "")) * Math.pow(60, i);
    if (time.length > 3) seconds += Number(time[3].replace(/[^\d.]+/g, "")) * 24 * 60 * 60;
    return seconds;
  } else {
    return Number(input.replace(/[^\d.]+/g, "")) || 0;
  }
}
/**
 * Parse number from input
 * @param input - Input
 */
export function parseNumber(input: any): number {
  if (typeof input === "string") return Number(input.replace(/[^\d.]+/g, "")) || 0;
  return Number(input) || 0;
}
