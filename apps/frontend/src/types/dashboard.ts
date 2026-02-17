export interface DashboardMetric {
  title: string
  value: number | string
  variation?: string
  variationType?: "positive" | "negative" | "neutral"
  icon: any
  iconColor: string
  iconBg: string
}
