import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { ErrorWithStatus } from '~/models/error'
import { validate } from '~/utils/validator'
import usersServices from '~/services/users.services'
import databaseService from '~/services/database.services'
import { hashPassword } from '~/utils/crypto'
import { verifyToken } from '~/utils/jwt.utils'
import { JsonWebTokenError } from 'jsonwebtoken'

// export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }
//   next();
// };

export const loginValidator = validate(
  checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid email address',
      custom: {
        options: async (value, { req }) => {
          const { email, password } = req.body
          const user = await databaseService.users.findOne({ email, password: hashPassword(password) })
          if (!user) {
            throw new ErrorWithStatus({ message: 'email or password is incorrect', status: 401 })
          }
          req.user = user
          return true
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid password'
    }
  })
)

export const registerValidator = validate(
  checkSchema({
    name: {
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      },
      errorMessage: 'Name is required'
    },
    password: {
      notEmpty: true,
      isString: true,
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1
        },
        errorMessage:
          'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol'
      }
      // trim: true,
    },
    confirmPassword: {
      isString: true,
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },
    dateOfBirth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        },
        errorMessage: 'Invalid date format'
      }
    },
    email: {
      notEmpty: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid email address',
      custom: {
        options: async (value, { req }) => {
          const { email } = req.body
          const isEmailExist = await usersServices.checkEmailExists({ email })
          if (isEmailExist) {
            throw new Error('Email address already in use 1')
          }
          return true
        }
      }
    }
  })
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string) => {
            if (!value) throw new ErrorWithStatus({ message: 'Access token is required', status: 401 })
            console.log('🚀 ~ file: users.middlewares.ts:119 ~ options: ~ value:', value)
            const accessToken = value.split(' ')[1]
            console.log('accesstoken', accessToken)
            if (!accessToken) {
              throw new ErrorWithStatus({ message: 'Access token is required', status: 401 })
            }
            return true
            const decodedAuth = await verifyToken(accessToken)
            const user = await databaseService.users.findOne({ accessToken: accessToken })
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refreshToken: {
        notEmpty: {
          errorMessage: 'Refresh token is required'
        },
        custom: {
          options: async (value: string, { req }) => {
            try {
              const [decodedRefreshToken, refreshToken] = await Promise.all([
                verifyToken(value),
                databaseService.refreshTokens.findOne({ token: value })
              ])
              if (!refreshToken) {
                throw new ErrorWithStatus({ message: 'Refresh token is invalid or not exist', status: 401 })
              }
              req.decodedRefreshToken = decodedRefreshToken

              console.log('🚀 ~ file: users.middlewares.ts:139 ~ options: ~ decodedRefreshToken:', decodedRefreshToken)
              return true
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 })
              }
              throw error
              // throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 });
            }
          }
        }
      }
    },
    ['body']
  )
)

export const emailVerifyTokenValidator = validate(
  checkSchema(
    {
      refreshToken: {
        notEmpty: {
          errorMessage: 'Refresh token is required'
        },
        custom: {
          options: async (value: string, { req }) => {
            try {
              const [decodedRefreshToken, refreshToken] = await Promise.all([
                verifyToken(value),
                databaseService.refreshTokens.findOne({ token: value })
              ])
              if (!refreshToken) {
                throw new ErrorWithStatus({ message: 'Refresh token is invalid or not exist', status: 401 })
              }
              req.decodedRefreshToken = decodedRefreshToken

              console.log('🚀 ~ file: users.middlewares.ts:139 ~ options: ~ decodedRefreshToken:', decodedRefreshToken)
              return true
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 })
              }
              throw error
              // throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 });
            }
          }
        }
      }
    },
    ['body']
  )
)