import { NextFunction, Request, Response } from 'express';
import { CreateUserBody, LoginReqBody, RegisterReqBody } from '../models/requets/user.requests';
import { ParamsDictionary } from 'express-serve-static-core';
// import databaseService from '~/services/database.services';
import usersService from '../services/users.services';
import { ApiResponse } from '../models/responses/base.response';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.model';
import { USER_MESSAGES } from '../constants/message';
import { User } from '../orm/entities/User';
import { logger } from '../utils/logging.util';

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const { user }: any = req;
  logger.log('info', 'login');

  const userId = user.id;
  const userType = user.userType;
  const fcmToken = user.fcmToken;
  const result = await usersService.login({ userId, userType, fcmToken });
  res.json(ApiResponse.success(result, USER_MESSAGES.LOGIN_SUCCESS));
};

export const createAccountController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await usersService.createAccount(req.body as CreateUserBody);
    delete result.password;
    logger.log('info', ` User ${result.id} created `);
    res.json(ApiResponse.success(result, USER_MESSAGES.CREATE_ACCOUNT_SUCCESS));
  } catch (error) {
    logger.log('error', error);
    next(error);
  }
};

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  const result = await usersService.logout(refreshToken);
  return res.json(ApiResponse.success(result, USER_MESSAGES.LOGOUT_SUCCESS));
};

export const createAccountAdminController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await usersService.createAccountDepartmentOfficer(req.body);
    res.json(ApiResponse.success(result, USER_MESSAGES.CREATE_ACCOUNT_SUCCESS));
  } catch (error) {
    next(error);
  }
};
// export const logoutController = async (req: Request, res: Response) => {
//   const refreshToken = req.body.refreshToken;
//   const result = await usersServices.logout(refreshToken);
//   res.status(200).json({
//     message: 'Logout successfully'
//   });
// };

export const forgotPasword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await usersService.forgotPassword(req.body.email as string);
    res.json(ApiResponse.success(result, USER_MESSAGES.FORGOT_PASSWORD_SENT_SUCCESSED));
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.decodedAuthorization?.userId as number;
    const changePasswordBody = req.body as { newPassword: string };
    const result = await usersService.changePassword(changePasswordBody.newPassword, userId);
    res.json(ApiResponse.success(result, USER_MESSAGES.CHANGE_PASSWORD_SUCCESS));
  } catch (error) {
    next(error);
  }
};
