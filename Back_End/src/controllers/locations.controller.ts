import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ApiResponse } from '../models/responses/base.response';
import { getPagingData } from '../utils/paging.utils';
import locationsService from '../services/locations.services';
import usersService from '../services/users.services';
import { UserType } from '../models/requets/user.requests';

// export const getLocationsByWardIdController = async (
//   req: any,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const limit = req.query.limit as string;
//     const skip = req.query.skip as string;
//     const userId = req.decodedAuthorization.userId;
//     const userType = req.decodedAuthorization.userType;
//     if (userType === UserType.WARD_OFFICER) {
//       const { manageWardId } = await usersService.getWardOfficerByUserId(userId);
//       console.log("🚀 ~ file: locations.controller.ts:16 ~ userType:", userType);
//       const results = await locationsService.getLocationsByWardId({ limit: parseInt(limit), skip: parseInt(skip), wardId: manageWardId });
//       return res.json(ApiResponse.success(results, 'success'));
//     } else {
//       throw new Error('You can not access this route');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const getLocationsByDistrictIdController = async (
//   req: any,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const limit = req.query.limit as string;
//     const skip = req.query.skip as string;
//     const userId = req.decodedAuthorization.userId;
//     const userType = req.decodedAuthorization.userType;

//     const listWardIdString = req.query.listWardId as string;
//     //convert string list wardId to list ward
//     const listWardId = listWardIdString.split(',').map((item: string) => parseInt(item, 10));

//     if (userType === UserType.DISTRICT_OFFICER) {
//       const { manageDistrictId } = await usersService.getDistrictOfficerByUserId(userId);
//       const results = await locationsService.getLocationsByDistrictId({ limit: parseInt(limit), skip: parseInt(skip), districtId: manageDistrictId, listWardId });
//       return res.json(ApiResponse.success(results, 'success'));
//     } else {
//       throw new Error('You can not access this route');
//     }
//   } catch (error) {
//     next(error);
//   }
// }

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

export const getLocationManageByUserIdController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.decodedAuthorization.userId;
    const userType = req.decodedAuthorization.userType;
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);
    const wardIdsString = req.query.wardIds as string;
    let listWardId = [];
    if (wardIdsString) {
      listWardId = wardIdsString.split(',').map((item: string) => parseInt(item, 10));
    }


    if (userType === UserType.WARD_OFFICER || userType === UserType.DISTRICT_OFFICER || userType === UserType.DEPARTMENT_OFFICER) {
      const results = await locationsService.getLocationManageByUserId(userId, userType, listWardId);
      const count = results.length;

      let data: any;
      if (limit === 0 && skip === 0) {
        data = results;
      } else {
        data = results.splice(skip, limit);
      }

      const dataPaging = getPagingData({ data, count, limit, skip });
      return res.json(ApiResponse.success(dataPaging, 'success'));
    }
    else {
      throw new Error('can not access this route');
    }
  } catch (error) {
    next(error);
  }
} 
