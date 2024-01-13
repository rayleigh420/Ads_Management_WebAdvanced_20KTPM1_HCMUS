import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import wardsServices from '../services/wards.services';
import { WardReqBody } from '../models/requets/admin.requests';
import { getPagingData } from '../utils/paging.utils';

export const getListWards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    const results = await wardsServices.findWardByDistrictId(parseInt(req.params.id));

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

export const createWard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await wardsServices.createWard(req.body as WardReqBody);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const updateWard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await wardsServices.updateWard(parseInt(req.params.id), req.body as WardReqBody);
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
