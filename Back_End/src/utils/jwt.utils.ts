import jwt, { SignOptions } from 'jsonwebtoken'
import { ErrorWithStatus } from '../models/error'

export const signToken = ({
  payload,
  privateKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey: string
  options?: SignOptions
}) => {
  return new Promise((resolve, rejects) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        rejects(err)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = (token: string, secretKey = process.env.JWT_SECRET_KEY as string) => {
  return new Promise<jwt.JwtPayload>((resolve, rejects) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        rejects(err)
        // throw new ErrorWithStatus({ message: 'Token is invalid', status: 401 });
      }
      resolve(decoded as jwt.JwtPayload)
    })
  })
}
