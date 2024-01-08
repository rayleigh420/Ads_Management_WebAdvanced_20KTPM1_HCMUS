import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import districtsServices from '../services/districts.services';

export const getListDistricts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await districtsServices.getListDistricts();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const deleteDistrict = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await districtsServices.deleteDistrict(req.body.id as number);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
