import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { getListWards } from '../controllers/wards.controllers';
import { getListDistricts } from '../controllers/districts.controlers';

const adminRouter = Router();

// Ward-management
adminRouter.get('/wards', wrapRequestHandler(getListWards));
// adminRouter.get('/wards/:id', wrapRequestHandler(getWardById));
// adminRouter.post('/wards', wrapRequestHandler(wardTest));
// adminRouter.put('/wards/:id', wrapRequestHandler(wardTest));
// adminRouter.delete('/wards/:id', wrapRequestHandler(deleteWard));

// District-management
adminRouter.get('/districts', wrapRequestHandler(getListDistricts));
// adminRouter.get('/districts/:id', wrapRequestHandler(getDistrict));
// adminRouter.post('/districts', wrapRequestHandler(districtTest));
// adminRouter.put('/districts/:id', wrapRequestHandler(districtTest));
// adminRouter.delete('/districts/:id', wrapRequestHandler(districtTest));

export default adminRouter;
