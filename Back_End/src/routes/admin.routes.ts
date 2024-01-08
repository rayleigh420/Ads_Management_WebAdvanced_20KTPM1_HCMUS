import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { createWard, deleteWard, getListWards, updateWard } from '../controllers/wards.controllers';
import {
  createDistrict,
  deleteDistrict,
  getListDistricts,
  getListWardByDistrictId,
  updateDistrict
} from '../controllers/districts.controlers';
import {
  BoardReqValidator,
  createDistrictValidator,
  createWardValidator,
  udpateDistrictValidator,
  updateWardValidator
} from '../middlewares/admin.middlewares';
import { createBoard, deleteBoard, getListBoards, updateBoard } from '../controllers/boards.controllers';

const adminRouter = Router();

// Ward-management
adminRouter.get('/wards', wrapRequestHandler(getListWards));
// adminRouter.get('/wards/:id', wrapRequestHandler(createWard));
adminRouter.post('/wards', createWardValidator, wrapRequestHandler(createWard));
adminRouter.put('/wards/:id', updateWardValidator, wrapRequestHandler(updateWard));
adminRouter.delete('/wards/:id', wrapRequestHandler(deleteWard));

// District-management
adminRouter.get('/districts', wrapRequestHandler(getListDistricts));
adminRouter.get('/districts/:id', wrapRequestHandler(getListWardByDistrictId));
adminRouter.post('/districts', createDistrictValidator, wrapRequestHandler(createDistrict));
adminRouter.put('/districts/:id', udpateDistrictValidator, wrapRequestHandler(updateDistrict));
adminRouter.delete('/districts/:id', wrapRequestHandler(deleteDistrict));

// Board-management
adminRouter.get('/boards', wrapRequestHandler(getListBoards));
adminRouter.post('/boards', BoardReqValidator, wrapRequestHandler(createBoard));
adminRouter.put('/borad/:id', BoardReqValidator, wrapRequestHandler(updateBoard));
adminRouter.delete('/board/:id', wrapRequestHandler(deleteBoard));

export default adminRouter;
