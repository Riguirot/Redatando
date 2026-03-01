import {
  calculateEvolution,
  type EvolutionResult,
} from "../../domain/services/calculateEvolution";

import type { DashboardMetric } from "../../types/dashboard";

/* =====================================================
   Tipos auxiliares
===================================================== */

export interface Competency {
  label: string;
  value: number;
  max: number;
}

export interface Theme {
  title: string;
  tag: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  focus: string;
}

export interface Insight {
  icon: string;
  title: string;
  description: string;
}

export interface ProgressFocus {
  weakestCompetence: string;
  sourceEssayId: string;
}

/* =====================================================
   Tipo principal do Dashboard
===================================================== */

export interface DashboardData {
  credits: number;
  studentInitial: string;
  studentName: string;
  subtitle: string;

  evolutionTotal: number;
  scoresHistory: number[];
  totalEssays: number;
  averageScore: number;
  evolutionLastThree: EvolutionResult;
  streakWeeks: number;

  month: string;
  completed: number;
  goal: number;
  daysSinceLastEssay: number;

  insights: Insight[];
  competencies: Competency[];
  overallProgress: number;
  themes: Theme[];
  metrics: DashboardMetric[];

  progressFocus?: ProgressFocus;
}

/* =====================================================
   HTTP Client interno
===================================================== */

async function fetchProgressFocus(): Promise<ProgressFocus> {
  const response = await fetch("http://localhost:8080/api/me/progress-focus");

  if (!response.ok) {
    throw new Error("Erro ao buscar progress focus");
  }

  const { data } = await response.json();
  return data;
}

/* =====================================================
   Use Case principal
===================================================== */

export async function getDashboardData(): Promise<DashboardData> {
  // Simulação de latência
  await new Promise((resolve) => setTimeout(resolve, 100));

  /* ---------- Dados simulados temporários ---------- */

  const lastThreeScores = [760, 800, 840];
  const evolutionLastThree = calculateEvolution(lastThreeScores);
  const totalEvolution =
    lastThreeScores[lastThreeScores.length - 1] - lastThreeScores[0];

  const totalEssays = 12;
  const averageScore = 820;
  const streakWeeks = 3;

  const metrics: DashboardMetric[] = [
    {
      title: "Redações Enviadas",
      value: totalEssays,
      variation: "+2",
      variationType: "positive",
      icon: "document",
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Média Geral",
      value: averageScore,
      variation: "+40 pontos",
      variationType: "positive",
      icon: "star",
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-500/10",
    },
    {
      title: "Evolução Recente",
      value: totalEvolution,
      variation:
        totalEvolution > 0
          ? `+${totalEvolution}`
          : totalEvolution < 0
          ? `${totalEvolution}`
          : "0",
      variationType:
        totalEvolution > 0
          ? "positive"
          : totalEvolution < 0
          ? "negative"
          : "neutral",
      icon: "chart",
      iconColor:
        totalEvolution > 0
          ? "text-green-400"
          : totalEvolution < 0
          ? "text-red-400"
          : "text-neutral-400",
      iconBg:
        totalEvolution > 0
          ? "bg-green-500/10"
          : totalEvolution < 0
          ? "bg-red-500/10"
          : "bg-neutral-500/10",
    },
    {
      title: "Semanas em sequência",
      value: streakWeeks,
      variation: "Consistência ativa",
      variationType: "positive",
      icon: "fire",
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/10",
    },
  ];

  /* ---------- Chamada real ao backend ---------- */

  let progressFocus: ProgressFocus | undefined;

  try {
    progressFocus = await fetchProgressFocus();
  } catch (error) {
    console.warn("Falha ao buscar progress focus:", error);
    progressFocus = undefined;
  }

  /* ---------- Retorno ---------- */

  return {
    credits: 1,
    studentInitial: "L",
    studentName: "Luiz",
    subtitle: "Você não envia uma redação há 7 dias",

    evolutionTotal: totalEvolution,
    scoresHistory: lastThreeScores,
    totalEssays,
    averageScore,
    evolutionLastThree,
    streakWeeks,

    month: "Janeiro 2025",
    completed: 6,
    goal: 8,
    daysSinceLastEssay: 7,

    insights: [
      {
        icon: "📈",
        title: "Evolução Detectada",
        description: "Sua competência C3 evoluiu 40 pontos.",
      },
    ],

    competencies: [
      { label: "C1 - Norma Culta", value: 160, max: 200 },
      { label: "C2 - Compreensão", value: 185, max: 200 },
      { label: "C3 - Argumentação", value: 175, max: 200 },
      { label: "C4 - Coesão", value: 180, max: 200 },
      { label: "C5 - Proposta", value: 140, max: 200 },
    ],

    overallProgress: 84,

    themes: [
      {
        title: "Inteligência Artificial na Educação",
        tag: "ENEM",
        difficulty: "Médio",
        focus: "C3",
      },
      {
        title: "Saúde Mental e Redes Sociais",
        tag: "ENEM",
        difficulty: "Fácil",
        focus: "C1",
      },
      {
        title: "Mobilidade Urbana Sustentável",
        tag: "ENEM",
        difficulty: "Difícil",
        focus: "C4",
      },
    ],

    metrics,
    progressFocus,
  };
}