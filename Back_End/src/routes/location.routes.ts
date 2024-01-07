import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { getBoardsByLocationIdController, getLocationByIdController, getLocationManageByUserIdController, getLocationsAnonymousByIdController, getLocationsAnonymousController} from '../controllers/locations.controller';
import { accessTokenValidator } from '../middlewares/users.middlewares';
const locationsRoute = Router();

//for resident
locationsRoute.get('/anonymous', wrapRequestHandler(getLocationsAnonymousController));
locationsRoute.get('/anonymous/boards', wrapRequestHandler(getBoardsByLocationIdController));

//for officer
//get all locations in ward/district/departments
locationsRoute.get('/officer', accessTokenValidator ,wrapRequestHandler(getLocationManageByUserIdController));

export default locationsRoute;
