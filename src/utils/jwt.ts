import jwt from 'jsonwebtoken'
const SECRET = 'your-secret-key'

export const signToken = (payload: object) => {
  return jwt.sign(
    // Explicit return added
    { ...payload, iss: 'I4ajblRsJaPrr9IdRR9g96VW68HHL8pv' },
    SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1h'
    }
  )
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET)
}
