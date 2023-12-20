import { createHash } from 'crypto'

export const sha256 = (content: string) => {
  return createHash('sha256').update(content).digest('hex')
}

export const hashPassword = (content: string) => {
  return sha256(content + process.env.HASH_SECRET)
}
