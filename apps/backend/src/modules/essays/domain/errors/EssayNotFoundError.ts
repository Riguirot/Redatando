export class EssayNotFoundError extends Error {
  constructor(essayId: string) {
    super(`Essay with id ${essayId} not found`)
    this.name = 'EssayNotFoundError'
  }
}
