import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { createWard, deleteWard, getListWards, updateWard } from '../controllers/wards.controllers';
import {
  createDistrict,
  deleteDistrict,
  getListDistricts,
  getListWardByDistrictId,
  updateDistrict,
} from '../controllers/districts.controlers';
import {
  BoardReqValidator,
  OfficerToDistrictValidator,
  OfficerToWardValidator,
  authorizationAdminValidator,
  createDistrictValidator,
  createWardValidator,
  udpateDistrictValidator,
  updateWardValidator,
} from '../middlewares/admin.middlewares';
import { createBoard, deleteBoard, getListBoardsByIdLocation, updateBoard } from '../controllers/boards.controllers';
import {
  addOfficerToDistrict,
  addOfficerToWard,
  approveLicense,
  cancelLicense,
  createAdsBoardType,
  deleteAdsBoardType,
  getAdsBoardTypeById,
  getListAdsBoardType,
  getListModificationRequest,
  getListReportInDistrictOfBoard,
  getListReportInDistrictofLocation,
  getListReportInWardOfBoard,
  getListReportInWardofLocation,
  updateAdsBoardType,
} from '../controllers/admins.controllers';
import { getLocationList } from '../controllers/locations.controller';

const adminRouter = Router();
adminRouter.use(authorizationAdminValidator);

// Ward-management
adminRouter.get('/wards/:id', wrapRequestHandler(getListWards));
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
adminRouter.get('/boards/:id', wrapRequestHandler(getListBoardsByIdLocation));
adminRouter.post('/boards', BoardReqValidator, wrapRequestHandler(createBoard));
adminRouter.put('/borad/:id', BoardReqValidator, wrapRequestHandler(updateBoard));
adminRouter.delete('/board/:id', wrapRequestHandler(deleteBoard));

// location-management
adminRouter.get('/locations', wrapRequestHandler(getLocationList));

// Report-management
adminRouter.get('/location-reports/ward/:id', wrapRequestHandler(getListReportInWardofLocation));
adminRouter.get('/board-reports/ward/:id', wrapRequestHandler(getListReportInWardOfBoard));
adminRouter.get('/location-reports/district/:id', wrapRequestHandler(getListReportInDistrictofLocation));
adminRouter.get('/board-reports/district/:id', wrapRequestHandler(getListReportInDistrictOfBoard));

// Officer-management
adminRouter.post('/district-officer', OfficerToDistrictValidator, wrapRequestHandler(addOfficerToDistrict));
adminRouter.post('/ward-officer', OfficerToWardValidator, wrapRequestHandler(addOfficerToWard));

// License-management
adminRouter.get('/approve-license/:id', wrapRequestHandler(approveLicense));
adminRouter.delete('/cancel-license/:id', wrapRequestHandler(cancelLicense));

// Modification-management
adminRouter.get('/modification-requests', wrapRequestHandler(getListModificationRequest));

//crud advertising type
adminRouter.get('/advertising-type', wrapRequestHandler(getListAdsBoardType));
adminRouter.get('/advertising-type/:id', wrapRequestHandler(getAdsBoardTypeById));
adminRouter.post('/advertising-type', wrapRequestHandler(createAdsBoardType));
adminRouter.put('/advertising-type/:id', wrapRequestHandler(updateAdsBoardType));
adminRouter.delete('/advertising-type/:id', wrapRequestHandler(deleteAdsBoardType));
export default adminRouter;
