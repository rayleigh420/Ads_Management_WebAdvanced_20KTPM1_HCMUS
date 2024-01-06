import { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import { ErrorWithStatus } from '../models/error';
import { validate } from '../utils/validator';
import usersServices from '../services/users.services';
import { hashPassword } from '../utils/crypto';
import { verifyToken } from '../utils/jwt.utils';
import { JsonWebTokenError } from 'jsonwebtoken';
import { FindOptions } from 'typeorm';
import { FindUserOptions } from '../models/requets/user.requests';
import { verifyAccessToken } from '../utils/common.util';

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
          const { email, password } = req.body;
          const hashedPassword = hashPassword(password);
          const findOptions: FindUserOptions = { email, password: hashedPassword };
          const user = await usersServices.findUserByOptions(findOptions);
          if (!user) {
            throw new ErrorWithStatus({ message: 'email or password is incorrect', status: 401 });
          }
          req.user = user;
          return true;
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid password'
    }
  })
);

export const registerValidator = validate(
  checkSchema({
    email: {
      notEmpty: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid email address',
      custom: {
        options: async (value, { req }) => {
          const { email } = req.body;
          const findOptions:  FindUserOptions = { email };
          const isEmailExist = await usersServices.findUserByOptions(findOptions);
          if (isEmailExist) {
            throw new Error('Email address already in use');
          }
          return true;
        }
      }
    }
  })
);

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const accessToken = (value || '').split(' ')[1]
            return await verifyAccessToken(accessToken, req)
          }
        }
      }
    },
    ['headers']
  )
)

// export const refreshTokenValidator = validate(
//   checkSchema(
//     {
//       refreshToken: {
//         notEmpty: {
//           errorMessage: 'Refresh token is required'
//         },
//         custom: {
//           options: async (value: string, { req }) => {
//             try {
//               const [decodedRefreshToken, refreshToken] = await Promise.all([
//                 verifyToken(value),
//                 databaseService.refreshTokens.findOne({ token: value })
//               ]);
//               if (!refreshToken) {
//                 throw new ErrorWithStatus({ message: 'Refresh token is invalid or not exist', status: 401 });
//               }
//               req.decodedRefreshToken = decodedRefreshToken;

//               console.log('🚀 ~ file: users.middlewares.ts:139 ~ options: ~ decodedRefreshToken:', decodedRefreshToken);
//               return true;
//             } catch (error) {
//               if (error instanceof JsonWebTokenError) {
//                 throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 });
//               }
//               throw error;
//               // throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 });
//             }
//           }
//         }
//       }
//     },
//     ['body']
//   )
// );

// export const emailVerifyTokenValidator = validate(
//   checkSchema(
//     {
//       refreshToken: {
//         notEmpty: {
//           errorMessage: 'Refresh token is required'
//         },
//         custom: {
//           options: async (value: string, { req }) => {
//             try {
//               const [decodedRefreshToken, refreshToken] = await Promise.all([
//                 verifyToken(value),
//                 databaseService.refreshTokens.findOne({ token: value })
//               ]);
//               if (!refreshToken) {
//                 throw new ErrorWithStatus({ message: 'Refresh token is invalid or not exist', status: 401 });
//               }
//               req.decodedRefreshToken = decodedRefreshToken;

//               console.log('🚀 ~ file: users.middlewares.ts:139 ~ options: ~ decodedRefreshToken:', decodedRefreshToken);
//               return true;
//             } catch (error) {
//               if (error instanceof JsonWebTokenError) {
//                 throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 });
//               }
//               throw error;
//               // throw new ErrorWithStatus({ message: 'Refresh token is invalid', status: 401 });
//             }
//           }
//         }
//       }
//     },
//     ['body']
//   )
// );
