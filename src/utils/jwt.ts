import jwt from 'jsonwebtoken'
const SECRET = process.env.JWT_SECRET || 'your-secret-key'

export const signToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET)
}
