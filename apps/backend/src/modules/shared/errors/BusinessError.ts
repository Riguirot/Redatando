export class BusinessError extends Error {
  public readonly code?: string

  constructor(message: string, code: string) {
    super(message)
    this.name = 'BusinessError'
    this.code = code

    Object.setPrototypeOf(this, BusinessError.prototype)
  }
}
