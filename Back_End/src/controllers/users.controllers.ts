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

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const { user }: any = req;
  const userId = user.id;
  const userType = user.userType;
  const result = await usersService.login({ userId, userType });
  res.json(ApiResponse.success(result, USER_MESSAGES.LOGIN_SUCCESS));

  // return res.status(200).json({
  //   message: 'Login successfully',
  //   result
  // });
  // res.json({ username: email, password: password });
  // try {
  //   const user = await databaseService.users.findOne({ email });
  //   return Boolean(user);
  //   if (!user) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   const isPasswordCorrect = await bcrypt.compare(password, user.password);

  //   if (!isPasswordCorrect) {
  //     return res.status(400).json({ message: 'Invalid credentials' });
  //   }

  //   const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1h' });

  //   res.status(200).json({ result: user, token });
  // } catch (error) {
  //   res.status(500).json({ message: 'Something went wrong' });
  // }
};

export const createAccountController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await usersService.createAccount(req.body as CreateUserBody);
    delete result.password;
    res.json(ApiResponse.success(result, USER_MESSAGES.CREATE_ACCOUNT_SUCCESS));
  } catch (error) {
    next(error);
  }
};

export const createAccountAdminController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction,
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
