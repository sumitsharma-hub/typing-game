import crypto from 'crypto'

export function generateKey (): string {
  return crypto.randomBytes(20).toString('hex')
}
