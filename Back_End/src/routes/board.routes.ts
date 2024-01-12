import { Router } from 'express'
import {
  getAllBoardsManageByUserId,
  getBoardByIdController,
  getBoardsController,
  getListBoardsByIdLocation
} from '../controllers/boards.controllers'
import { wrapRequestHandler } from '../utils/handler.ultil'
import { accessTokenValidator } from '../middlewares/users.middlewares'
import { getBoardsByLocationIdController } from '../controllers/locations.controller'
import { authorizationOfficerValidator } from '../middlewares/admin.middlewares'

const boardsRouter = Router()

//for map page
boardsRouter.get('/', authorizationOfficerValidator, wrapRequestHandler(getListBoardsByIdLocation))
boardsRouter.get('/anonymous', wrapRequestHandler(getBoardsByLocationIdController))
boardsRouter.get('/anonymous/:id', wrapRequestHandler(getBoardByIdController))

//for officer
boardsRouter.get('/ward/:id', accessTokenValidator, wrapRequestHandler(getListBoardsByIdLocation))
boardsRouter.get('/officer', accessTokenValidator, wrapRequestHandler(getAllBoardsManageByUserId))

export default boardsRouter
