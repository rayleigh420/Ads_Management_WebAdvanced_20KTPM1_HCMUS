import { NextFunction, Request, Response } from 'express';
import { RegisterReqBody } from '../models/requets/user.requests';
import { ParamsDictionary } from 'express-serve-static-core';
// import databaseService from '~/services/database.services';
import usersService from '../services/users.services';
import { ApiResponse } from '../models/responses/base.response';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.model';
import { USER_MESSAGES } from '../constants/message';

// export const loginController = async (req: Request, res: Response) => {
//   const user: User = req.user as User;
//   console.log('🚀 ~ file: users.controllers.ts:13 ~ loginController ~ user:', user);
//   const userId = user._id;
//   const result = await usersServices.login(userId.toString());
//   return res.status(200).json({
//     message: 'Login successfully',
//     result
//   });
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
// };

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await usersService.register(req.body);
    console.log("🚀 ~ file: users.controllers.ts:50 ~ result:", result)
    res.json(ApiResponse.success(result, USER_MESSAGES.REGISTER_SUCCESS));
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
