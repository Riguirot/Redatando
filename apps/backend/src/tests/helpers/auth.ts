export function authHeader(userId: string) {
  return {
    Authorization: `Bearer test-token-${userId}`,
  }
}
