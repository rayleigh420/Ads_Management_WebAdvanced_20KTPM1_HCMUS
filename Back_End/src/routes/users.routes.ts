import { Router } from 'express';
import { forgotPasswordValidator, loginValidator, registerValidator } from '../middlewares/users.middlewares';
import { wrapRequestHandler } from '../utils/handler.ultil';
import {
  loginController,
  createAccountAdminController,
  createAccountController,
  forgotPasword
} from '../controllers/users.controllers';

const usersRouter = Router();

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController));
usersRouter.post('/account', registerValidator, wrapRequestHandler(createAccountController));
usersRouter.post('/register', wrapRequestHandler(createAccountAdminController));
usersRouter.post('/forgot', forgotPasswordValidator, wrapRequestHandler(forgotPasword));

export default usersRouter;
