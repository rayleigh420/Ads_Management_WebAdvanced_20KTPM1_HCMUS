import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import wardsServices from '../services/wards.services';

export const getListWards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await wardsServices.getListWards();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const deleteWard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await wardsServices.deleteWard(req.body.id as number);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
