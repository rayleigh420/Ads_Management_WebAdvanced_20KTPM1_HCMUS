import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
// import databaseService from '~/services/database.services';
import boardsService from '../services/boards.services';
import { ApiResponse } from '../models/responses/base.response';
import { getPagingData } from '../utils/paging.utils';
import usersServices from '../services/users.services';
import { BoardReqBody } from '../models/requets/admin.requests';
import { UserType } from '../models/requets/user.requests';

export const getBoardsController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const limit = req.query.limit as string;
    const skip = req.query.skip as string;
    const userId = req.decodedAuthorization?.userId as number;
    const userType = req.decodedAuthorization?.userType as number;
    console.log('🚀 ~ file: boards.controllers.ts:19 ~ userType:', userType);

    const results = await boardsService.getBoards({ limit: parseInt(limit), skip: parseInt(skip) });
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', req.decodedAuthorization?.userId as string);
    const dataPaging = getPagingData({
      data: results,
      count: results[1],
      limit: parseInt(limit),
      skip: parseInt(skip),
    });
    res.json(ApiResponse.success(dataPaging, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getBoardByIdController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await boardsService.getBoardById(parseInt(id, 10));
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getListBoardsByIdLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    console.log('🚀 ~ file: boards.controllers.ts:47 ~ id:', id);
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    const results = await boardsService.getListBoard(id);
    console.log('🚀 ~ file: boards.controllers.ts:16 ~ results:', results);
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

export const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBoard = req.body as BoardReqBody;
    // const image1 = req.file as Express.Multer.File;
    const images = req.files as Express.Multer.File[];
    const result = await boardsService.createBoard(newBoard, images);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = req.files as Express.Multer.File[];
    const result = await boardsService.updateBoard(parseInt(req.params.id), req.body as BoardReqBody, images);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await boardsService.deleteBoard(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getAllBoardsManageByUserId = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.decodedAuthorization?.userId as number;
    const userType = req.decodedAuthorization?.userType as number;
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);
    if (userType === UserType.WARD_OFFICER) {
      const wardOfficer = await usersServices.getWardOfficerByUserId(userId);
      const wardId = wardOfficer.manageWardId;
      console.log('🚀 ~ wardId:', wardId);
      const results = await boardsService.getAllBoardManageWard(wardId);
      let data: any;
      const count = results.length;
      if (limit === 0 && skip === 0) {
        data = results;
      } else {
        data = results.splice(skip, limit);
        console.log('🚀 ~ getAllBoardsManageByUserId ~ data:', data);
      }
      const dataPaging = getPagingData({ data: results, count, limit, skip });
      return res.json(ApiResponse.success(dataPaging, 'success'));
    }
  } catch (error) {
    next(error);
  }
};
