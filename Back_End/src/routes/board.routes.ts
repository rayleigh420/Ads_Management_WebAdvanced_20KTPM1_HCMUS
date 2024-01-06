import { Router } from 'express';
import { getBoardByIdController, getBoardsController } from '../controllers/boards.controllers';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { accessTokenValidator } from '../middlewares/users.middlewares';
import { getBoardsByLocationIdController } from '../controllers/locations.controller';

const boardsRouter = Router();

//for map page
boardsRouter.get('/anonymous', wrapRequestHandler(getBoardsByLocationIdController));
boardsRouter.get('/anonymous/:id', wrapRequestHandler(getBoardByIdController));

//for admin page
// boardsRouter.get('/', wrapRequestHandler(getBoardsController));
// boardsRouter.get('/:id', wrapRequestHandler(getBoardsController));

export default boardsRouter;
