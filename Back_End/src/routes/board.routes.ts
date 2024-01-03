import { Router } from 'express';
import { getBoardByIdController, getBoardsController } from '../controllers/boards.controllers';
import { wrapRequestHandler } from '../utils/handler.ultil';

const boardsRouter = Router();

boardsRouter.get('/', wrapRequestHandler(getBoardsController));
boardsRouter.get('/:id', wrapRequestHandler(getBoardByIdController));

export default boardsRouter;
