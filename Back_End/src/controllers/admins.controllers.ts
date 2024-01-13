import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import adminServices from '../services/admin.services';
import { OfficerToDistrict, OfficerToWard } from '../models/requets/admin.requests';
import licenseServices from '../services/license.services';
import reportsServices from '../services/reports.services';
import { getPagingData } from '../utils/paging.utils';

export const addOfficerToDistrict = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.addOfficerToDistrict(req.body as OfficerToDistrict);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const addOfficerToWard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.addOfficerToWard(req.body as OfficerToWard);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const approveLicense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await licenseServices.approveLicense(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const cancelLicense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await licenseServices.deleteLicense(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListReportInWardofLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reportsServices.getListReportInWardofLocation(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListReportInWardOfBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reportsServices.getListReportInWardOfBoard(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListReportInDistrictofLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reportsServices.getListReportInDistrictOfLocation(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListReportInDistrictOfBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reportsServices.getListReportInDistrictOfBoard(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListModificationRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.getListModificationRequest();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListAdsBoardType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    const results = await adminServices.getListAdsBoardType();

    const count = results.length;
    let data: any;
    if (limit === 0 && skip === 0) {
      data = results;
    } else {
      data = results.splice(skip - 1, limit);
    }
    const dataPaging = getPagingData({ data, count, limit, skip });
    return res.json(ApiResponse.success(dataPaging, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getAdsBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.getAdsBoardTypeById(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
export const updateAdsBoardType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateAdsBoardTypeBody = req.body as { name: string };
    const result = await adminServices.updateAdsBoardType(parseInt(req.params.id), updateAdsBoardTypeBody.name);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const deleteAdsBoardType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.deleteAdsBoardType(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const createAdsBoardType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createAdsBoardTypeBody = req.body as { name: string };
    const result = await adminServices.createAdsBoardType(createAdsBoardTypeBody.name);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
