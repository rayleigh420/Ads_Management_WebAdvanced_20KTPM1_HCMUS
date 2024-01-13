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
  createReportForm,
  deleteAdsBoardType,
  deleteReportForm,
  getAdsBoardTypeById,
  getListAdsBoardType,
  getListModificationRequest,
  getListReportForm,
  getListReportInDistrictOfBoard,
  getListReportInDistrictofLocation,
  getListReportInWardOfBoard,
  getListReportInWardofLocation,
  getReportFormById,
  getReportStat,
  updateAdsBoardType,
  updateReportForm,
} from '../controllers/admins.controllers';
import { createLocation, deleteLocation, getLocationList, updateLocation } from '../controllers/locations.controller';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 2 MB
    files: 2,
  },
});

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
adminRouter.post('/boards', upload.array('file', 2), BoardReqValidator, wrapRequestHandler(createBoard));
adminRouter.patch('/boards/:id', upload.array('file', 2), BoardReqValidator, wrapRequestHandler(updateBoard));
adminRouter.delete('/boards/:id', wrapRequestHandler(deleteBoard));

// location-management
adminRouter.get('/locations', wrapRequestHandler(getLocationList));
adminRouter.post('/locations', upload.array('file', 2), wrapRequestHandler(createLocation));
adminRouter.patch('/locations/:id', upload.array('file', 2), wrapRequestHandler(updateLocation));
adminRouter.delete('/locations/:id', wrapRequestHandler(deleteLocation));

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

//CRUD report form
adminRouter.get('/report-form', wrapRequestHandler(getListReportForm));
adminRouter.get('/report-form/:id', wrapRequestHandler(getReportFormById));
adminRouter.post('/report-form', wrapRequestHandler(createReportForm));
adminRouter.put('/report-form/:id', wrapRequestHandler(updateReportForm));
adminRouter.delete('/report-form/:id', wrapRequestHandler(deleteReportForm));

//statistics
adminRouter.get('/statistic/report/ward/:id', wrapRequestHandler(getReportStat));

export default adminRouter;
