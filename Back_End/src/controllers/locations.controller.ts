import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
// import databaseService from '~/services/database.services';
import boardsService from '../services/boards.services';
import { ApiResponse } from '../models/responses/base.response';
import { getPagingData } from '../utils/paging.utils';
import locationsService from '../services/locations.services';
import { parse } from 'path';

export const getLocationsController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit as string;
    console.log("🚀 ~ file: locations.controller.ts:16 ~ limit:", limit)
    const skip = req.query.skip as string;
    const results = await locationsService.getLocations({ limit: parseInt(limit), skip: parseInt(skip) });
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', results);
    const dataPaging = getPagingData({data: results, limit:  parseInt(limit),skip: parseInt(skip)});
    res.json(ApiResponse.success(dataPaging, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getLocationByIdController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const results = await locationsService.getLocationById(parseInt(id, 10));
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', results);
    res.json(ApiResponse.success(results, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getLocationsAnonymousController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await locationsService.getLocationsAnonymous();
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', results);
    res.json(ApiResponse.success(results, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getBoardsByLocationIdController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.locationId as string;
    const results = await locationsService.getBoardsByLocationId(parseInt(id, 10));
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', results);
    res.json(ApiResponse.success(results, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getLocationsAnonymousByIdController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const results = await locationsService.getLocationsAnonymousById(parseInt(id, 10));
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', results);
    res.json(ApiResponse.success(results, 'success'));
  } catch (error) {
    next(error);
  }
};
