import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import adminServices from '../services/admin.services';
import { OfficerToDistrict, OfficerToWard } from '../models/requets/admin.requests';

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
