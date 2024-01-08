import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import districtsServices from '../services/districts.services';
import { DistrictReqBody } from '../models/requets/admin.requests';

export const getListDistricts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await districtsServices.getListDistricts();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const createDistrict = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await districtsServices.createDistrict(req.body as DistrictReqBody);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const deleteDistrict = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await districtsServices.deleteDistrict(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
