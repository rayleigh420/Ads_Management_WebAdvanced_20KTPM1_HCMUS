import { Router } from 'express';
import {  loginValidator, registerValidator } from '../middlewares/users.middlewares';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { loginController, registerController } from '../controllers/users.controllers';

const usersRouter = Router();

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController));
usersRouter.post('/register', registerValidator,  wrapRequestHandler(registerController));

export default usersRouter;