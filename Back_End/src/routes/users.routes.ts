import { Router } from 'express';
import {  loginValidator, registerValidator } from '../middlewares/users.middlewares';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { loginController, createAccountAdminController, createAccountController } from '../controllers/users.controllers';

const usersRouter = Router();

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController));
usersRouter.post('/account', registerValidator, wrapRequestHandler(createAccountController));
usersRouter.post('/register', wrapRequestHandler(createAccountAdminController));

export default usersRouter;