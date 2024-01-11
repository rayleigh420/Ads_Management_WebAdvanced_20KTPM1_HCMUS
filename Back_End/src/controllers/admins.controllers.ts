import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import adminServices from '../services/admin.services';
import { OfficerToDistrict, OfficerToWard } from '../models/requets/admin.requests';
import licenseServices from '../services/license.services';
import reportsServices from '../services/reports.services';

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
