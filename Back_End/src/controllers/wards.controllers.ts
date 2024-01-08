import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import wardsServices from '../services/wards.services';
import { WardReqBody } from '../models/requets/admin.requests';

export const getListWards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await wardsServices.getListWards();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const createWard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await wardsServices.createWard(req.body as WardReqBody);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const deleteWard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await wardsServices.deleteWard(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
