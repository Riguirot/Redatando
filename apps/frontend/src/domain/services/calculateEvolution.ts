export type EvolutionTrend = "up" | "down" | "stable";

export interface EvolutionResult {
  value: number;
  trend: EvolutionTrend;
}

export function calculateEvolution(
  scores: number[]
): EvolutionResult {
  if (scores.length < 2) {
    return { value: 0, trend: "stable" };
  }

  const first = scores[0];
  const last = scores[scores.length - 1];
  const diff = last - first;

  if (diff > 0) {
    return { value: diff, trend: "up" };
  }

  if (diff < 0) {
    return { value: diff, trend: "down" };
  }

  return { value: 0, trend: "stable" };
}
