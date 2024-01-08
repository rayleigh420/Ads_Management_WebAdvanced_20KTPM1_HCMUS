import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import districtsServices from '../services/districts.services';
import { DistrictReqBody } from '../models/requets/admin.requests';
import wardsServices from '../services/wards.services';

export const getListDistricts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await districtsServices.getListDistricts();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListWardByDistrictId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await wardsServices.findWardByDistrictId(parseInt(req.params.id));
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

export const updateDistrict = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await districtsServices.updateDistrict(parseInt(req.params.id), req.body as DistrictReqBody);
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
