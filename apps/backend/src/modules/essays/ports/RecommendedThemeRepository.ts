export interface RecommendedThemeRepository {
  findByCompetency(
    competency: string,
    limit: number
  ): Promise<
    {
      id: string
      title: string
      focusCompetency: string
    }[]
  >
}