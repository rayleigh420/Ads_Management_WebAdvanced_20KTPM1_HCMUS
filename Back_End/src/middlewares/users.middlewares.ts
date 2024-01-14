import { Request, Response, NextFunction } from 'express';
import { check, checkSchema } from 'express-validator';
import { ErrorWithStatus } from '../models/error';
import { validate } from '../utils/validator';
import usersServices from '../services/users.services';
import { hashPassword } from '../utils/crypto';
import { verifyToken } from '../utils/jwt.utils';
import { JsonWebTokenError } from 'jsonwebtoken';
import { FindOptions } from 'typeorm';
import { FindUserOptions } from '../models/requets/user.requests';
import { verifyAccessToken } from '../utils/common.util';
import { logger } from '../utils/logging.util';
import { USER_MESSAGES } from '../constants/message';
import HTTP_STATUS from '../constants/httpStatus';
import { envConfig } from '../constants/config';
import { myDataSource } from '../orm/connectDb';
import { RefreshToken } from '../orm/entities/RefreshToken';
import { capitalize } from 'lodash';

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
          user.fcmToken = req.body.fcmToken;
          usersServices.updateUser(user);
          if (!user) {
            throw new ErrorWithStatus({ message: 'email or password is incorrect', status: 401 });
          }
          req.user = user;
          return true;
        },
      },
    },
    password: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid password',
    },
  }),
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
          const findOptions: FindUserOptions = { email };
          const isEmailExist = await usersServices.findUserByOptions(findOptions);
          if (isEmailExist) {
            logger.error('Email address already in use');
            throw new Error('Email address already in use');
          }
          return true;
        },
      },
    },
  }),
);

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const accessToken = (value || '').split(' ')[1];
            return await verifyAccessToken(accessToken, req);
          },
        },
      },
    },
    ['headers'],
  ),
);

export const forgotPasswordValidator = validate(
  checkSchema({
    email: {
      notEmpty: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid email address',
      custom: {
        options: async (value, { req }) => {
          const { email } = req.body;
          const findOptions: FindUserOptions = { email };
          const isEmailExist = await usersServices.findUserByOptions(findOptions);
          if (!isEmailExist) {
            throw new Error('Email address does not exist in system');
          }
          return true;
        },
      },
    },
  }),
);

export const changePasswordValidator = validate(
  checkSchema(
    {
      newPassword: {
        notEmpty: true,
        isString: true,
        errorMessage: 'Invalid password',
      },
    },
    ['body'],
  ),
);

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USER_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            try {
              const [decodedRefreshToken, refreshToken] = await Promise.all([
                verifyToken( value, envConfig.jwtSecretRefreshToken as string),
            myDataSource.getRepository(RefreshToken).findOne({where: {token: value}})
              ])
              if (refreshToken === null) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST,
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              req.decodedRefreshToken = decodedRefreshToken;
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)