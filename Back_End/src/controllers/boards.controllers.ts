import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
// import databaseService from '~/services/database.services';
import boardsService from '../services/boards.services';
import { ApiResponse } from '../models/responses/base.response';
import { getPagingData } from '../utils/paging.utils';
import usersServices from '../services/users.services';

export const getBoardsController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit as string;
    const skip = req.query.skip as string;
    const userId = req.decodedAuthorization?.userId as number;
    const userType = req.decodedAuthorization?.userType as number;
    console.log("🚀 ~ file: boards.controllers.ts:19 ~ userType:", userType)

    const results = await boardsService.getBoards({ limit: parseInt(limit), skip: parseInt(skip) });
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', req.decodedAuthorization?.userId as string);
    const dataPaging = getPagingData({data: results, count: results[1], limit:  parseInt(limit),skip: parseInt(skip)});
    res.json(ApiResponse.success(dataPaging, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getBoardByIdController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await boardsService.getBoardById(parseInt(id, 10));
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    next(error);
  }
}


// export const getBoardByLocationIdController = async (
//   req: Request<ParamsDictionary, any, any>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const id = req.query.locationId as string;
//     const result = await boardsService.getBoardByLocationId(parseInt(id, 10));
//     res.json(ApiResponse.success(result, 'success'));
//   } catch (error) {
//     next(error);
//   }
