export interface Competency {
  label: string;
  value: number;
  max: number;
}

export interface Insight {
  title: string;
  description: string;
  icon: string;
}

export interface DashboardResponse {
  studentName: string;
  studentInitial: string;

  credits: number;

  totalEssays: number;
  averageScore: number;

  streakWeeks: number;

  evolutionLastThree: {
    value: number;
    trend: "up" | "down" | "stable";
  };

  competencies: Competency[];
  overallProgress: number;
  scoresHistory: number[];
  evolutionTotal: number;

  insights: Insight[];
  themes: string[];

  month: string;
  completed: number;
  goal: number;
}
