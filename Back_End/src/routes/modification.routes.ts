import { Router } from 'express'
import { wrapRequestHandler } from '../utils/handler.ultil'
import { accessTokenValidator } from '../middlewares/users.middlewares'
import { createModificationRequestcontroller } from '../controllers/modifications.controllers'

const modificationRouter = Router()

// licenseRouter.use(authorizationWardOfficerValidator);

modificationRouter.post('/', accessTokenValidator, wrapRequestHandler(createModificationRequestcontroller))

export default modificationRouter
