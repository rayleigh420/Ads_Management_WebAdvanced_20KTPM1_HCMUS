import { Router } from 'express';
import {  loginValidator, registerValidator } from '../middlewares/users.middlewares';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { loginController, registerController } from '../controllers/users.controllers';
import { getBoardsController } from '../controllers/boards.controllers';

const boardsRouter = Router();

boardsRouter.get('/boards', getBoardsController);

export default boardsRouter;