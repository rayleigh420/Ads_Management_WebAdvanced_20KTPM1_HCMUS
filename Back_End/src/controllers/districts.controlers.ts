import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import districtsServices from '../services/districts.services';
import { DistrictReqBody } from '../models/requets/admin.requests';
import wardsServices from '../services/wards.services';
import { getPagingData } from '../utils/paging.utils';

export const getListDistricts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    let results = await districtsServices.getListDistricts();
    results = results.slice().reverse();

    const count = results.length;
    let data: any;
    if (limit === 0 && skip === 0) {
      data = results;
    } else {
      data = results.splice((skip - 1) * limit, limit);
    }
    const dataPaging = getPagingData({ data, count, limit, skip });
    return res.json(ApiResponse.success(dataPaging, 'success'));
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
