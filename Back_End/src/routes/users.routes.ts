import { Router } from 'express';
import {  registerValidator } from '../middlewares/users.middlewares';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { registerController } from '../controllers/users.controllers';

const usersRouter = Router();

// usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController));
usersRouter.post('/register', registerValidator,  registerController);

export default usersRouter;