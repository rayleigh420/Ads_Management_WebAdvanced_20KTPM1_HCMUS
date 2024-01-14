import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import licenseServices from '../services/license.services';
import { LicenseReqBody } from '../models/requets/license.request';
import { extend } from 'lodash';
import { getPagingData } from '../utils/paging.utils';

export const getListLicenseRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    let results = await licenseServices.getListLicense();
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

export const createLicenseRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await licenseServices.createLicenseRequest(req.body as LicenseReqBody);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const deleteLicense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await licenseServices.deleteLicense(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
