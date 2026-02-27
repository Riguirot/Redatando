import type { EvolutionResult } from "../../domain/services/calculateEvolution";
import { calculateEvolution } from "../../domain/services/calculateEvolution";

interface CompetencyViewModel {
  label: string;
  value: number;
  max: number;
}

interface ProgressFocusViewModel {
  weakestCompetence: string;
}

interface DashboardViewModel {
  studentName: string;
  studentInitial: string;
  credits: number;
  subtitle: string;

  totalEssays: number;
  averageScore: number;
  evolutionLastThree: EvolutionResult;
  streakWeeks: number;

  month: string;
  completed: number;
  goal: number;
  daysSinceLastEssay: number;

  insights: any[];
  competencies: CompetencyViewModel[];
  overallProgress: number;
  scoresHistory: number[];
  evolutionTotal: number;

  progressFocus: ProgressFocusViewModel | null;
  themes: any[];
}

export async function getDashboardData(): Promise<DashboardViewModel> {
  const studentId = "c641d56d-31cd-494c-995b-00602bdd1146";

  const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

  const response = await fetch(
    `${API_BASE_URL}/dashboard?studentId=${studentId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const backendData = await response.json();

  // 🔥 Aqui usamos a função REAL do domínio
  const evolutionLastThree = calculateEvolution([]);

  return {
    // ===== STUDENT =====
    studentName: backendData.student.name,
    studentInitial: backendData.student.name.charAt(0),
    credits: backendData.student.credits,
    subtitle: "Continue evoluindo na sua escrita 🚀",

    // ===== SUMMARY =====
    totalEssays: backendData.stats.totalEssays,
    averageScore: backendData.analytics.averages.total ?? 0,
    evolutionLastThree,
    streakWeeks: 0,

    // ===== MONTH =====
    month: "Fevereiro",
    completed: backendData.stats.totalEssays,
    goal: 8,
    daysSinceLastEssay: 0,

    // ===== ANALYTICS =====
    insights: [
      {
        title: "Evolução Detectada",
        description: `Sua média evoluiu recentemente. Continue nesse ritmo.`,
        icon: "📈"
      },
      
      {
        title: "Recomendação de Foco",
        description: `Trabalhe mais na competência ${backendData.analytics.weakestCompetency}`,
        icon: "🎯"
      },
      
      {
        title: "Força Identificada",
        description: `Sua melhor competência está muito consistente.`,
        icon: "💪"
      }
],
    competencies: [
      { label: "C1", value: backendData.analytics.averages.c1, max: 200 },
      { label: "C2", value: backendData.analytics.averages.c2, max: 200 },
      { label: "C3", value: backendData.analytics.averages.c3, max: 200 },
      { label: "C4", value: backendData.analytics.averages.c4, max: 200 },
      { label: "C5", value: backendData.analytics.averages.c5, max: 200 },
    ],
    overallProgress: backendData.analytics.averages.total,
    scoresHistory: [650, 720, 690, 780, 820],
    evolutionTotal: 0,

    // ===== PROGRESS FOCUS =====
    progressFocus: backendData.analytics.weakestCompetency
      ? { weakestCompetence: backendData.analytics.weakestCompetency }
      : null,

    // ===== THEMES =====
    themes: [
      {
        title: "Inteligência Artificial na Educação",
        tag: "ENEM",
        difficulty: "Médio",
        focus: "C3"
      },
      {
        title: "Saúde Mental e Redes Sociais",
        tag: "Atualidades",
        difficulty: "Fácil",
        focus: "C1"
      },
      {
        title: "Mobilidade Urbana Sustentável",
        tag: "Argumentação",
        difficulty: "Difícil",
        focus: "C4"
      }
    ],
  };
}