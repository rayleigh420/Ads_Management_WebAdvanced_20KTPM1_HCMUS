import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { getBoardsByLocationIdController, getLocationByIdController, getLocationsAnonymousByIdController, getLocationsAnonymousController, getLocationsController } from '../controllers/locations.controller';
const locationsRoute = Router();

locationsRoute.get('/anonymous', wrapRequestHandler(getLocationsAnonymousController));
locationsRoute.get('/anonymous/boards', wrapRequestHandler(getBoardsByLocationIdController));
locationsRoute.get('/anonymous/:id', wrapRequestHandler(getLocationsAnonymousByIdController));
locationsRoute.get('/anonymous/:id/boards', wrapRequestHandler(getLocationsAnonymousByIdController));

locationsRoute.get('/', wrapRequestHandler(getLocationsController));
locationsRoute.get('/:id', wrapRequestHandler(getLocationByIdController));

export default locationsRoute;
