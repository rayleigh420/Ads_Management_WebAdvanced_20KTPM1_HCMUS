import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { getLocationsController } from '../controllers/locations.controller';
const locationsRoute = Router();

locationsRoute.get('/', wrapRequestHandler(getLocationsController));

export default locationsRoute;
