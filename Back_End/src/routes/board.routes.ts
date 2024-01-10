import { Router } from 'express';
import { getAllBoardsManageByUserId, getBoardByIdController, getBoardsController } from '../controllers/boards.controllers';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { accessTokenValidator } from '../middlewares/users.middlewares';
import { getBoardsByLocationIdController } from '../controllers/locations.controller';

const boardsRouter = Router();

//for map page
boardsRouter.get('/anonymous', wrapRequestHandler(getBoardsByLocationIdController));
boardsRouter.get('/anonymous/:id', wrapRequestHandler(getBoardByIdController));

//for officer
boardsRouter.get('/officer', accessTokenValidator, wrapRequestHandler(getAllBoardsManageByUserId));

export default boardsRouter;
