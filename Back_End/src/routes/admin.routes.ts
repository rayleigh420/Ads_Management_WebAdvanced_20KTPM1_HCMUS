import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { createWard, deleteWard, getListWards } from '../controllers/wards.controllers';
import { createDistrict, deleteDistrict, getListDistricts } from '../controllers/districts.controlers';
import { createDistrictValidator, createWardValidator } from '../middlewares/admin.middlewares';

const adminRouter = Router();

// Ward-management
adminRouter.get('/wards', wrapRequestHandler(getListWards));
// adminRouter.get('/wards/:id', wrapRequestHandler(createWard));
adminRouter.post('/wards', createWardValidator, wrapRequestHandler(createWard));
// adminRouter.put('/wards/:id', wrapRequestHandler(wardTest));
adminRouter.delete('/wards/:id', wrapRequestHandler(deleteWard));

// District-management
adminRouter.get('/districts', wrapRequestHandler(getListDistricts));
// adminRouter.get('/districts/:id', wrapRequestHandler(createDistrict));
adminRouter.post('/districts', createDistrictValidator, wrapRequestHandler(createDistrict));
// adminRouter.put('/districts/:id', wrapRequestHandler(districtTest));
adminRouter.delete('/districts/:id', wrapRequestHandler(deleteDistrict));

export default adminRouter;
