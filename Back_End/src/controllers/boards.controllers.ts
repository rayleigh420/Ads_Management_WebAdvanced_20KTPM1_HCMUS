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
    const limit = req.query.limit as string;
    const skip = req.query.skip as string;
    const results = await boardsService.getBoards({ limit: parseInt(limit), skip: parseInt(skip) });
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', results);
    const dataPaging = getPagingData({data: results, limit:  parseInt(limit),skip: parseInt(skip)});
    // const data = {
    //   results,
    //   pageCount,
    //   itemCount: results.length,
    //   pages: req.query.page,
    // }
    res.json(ApiResponse.success(dataPaging, 'success'));
  } catch (error) {
    next(error);
  }
};
