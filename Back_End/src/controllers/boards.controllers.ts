import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
// import databaseService from '~/services/database.services';
import boardsService from '../services/boards.services';
import { ApiResponse } from '../models/responses/base.response';
import { getPagingData } from '../utils/paging.utils';

export const getBoardsController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("🚀 ~ file: boards.controllers.ts:16 ~ req.query", req.query)
    const limit = req.query.limit as string;
    const skip = req.query.skip as string;
    const results = await boardsService.getBoards({ limit: parseInt(limit), skip: parseInt(skip) });
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', results);
    const dataPaging = getPagingData({data: results, limit:  parseInt(limit),skip: parseInt(skip)});
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
    console.log("🚀 ~ file: boards.controllers.ts:32 ~ id:", id)
    const result = await boardsService.getBoardById(parseInt(id, 10));
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    next(error);
  }
}
