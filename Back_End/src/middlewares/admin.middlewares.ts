import { checkSchema } from 'express-validator';
import { validate } from '../utils/validator';
import { FindDistrictOption, FindWardOption, WardReqBody } from '../models/requets/admin.requests';
import wardsServices from '../services/wards.services';
import districtsServices from '../services/districts.services';
import { verifyAccessToken } from '../utils/common.util';
import { DataSource } from 'typeorm';
import { myDataSource } from '../orm/connectDb';
import { User } from '../orm/entities/User';
import { District } from '../orm/entities/District';
import { Ward } from '../orm/entities/Ward';

export const authorizationAdminValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const accessToken = (value || '').split(' ')[1];
            return await verifyAccessToken(accessToken, req, 0);
          }
        }
      }
    },
    ['headers']
  )
);

export const createWardValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid name'
    },
    districtId: {
      notEmpty: true,
      isNumeric: true,
      custom: {
        options: async (value, { req }) => {
          const { name } = req.body;
          const findOptions: FindWardOption = { name };
          const isWardExist = await wardsServices.findWardByOption(findOptions);
          if (isWardExist) {
            throw new Error('Ward is already in system');
          }
          return true;
        }
      }
    }
  })
);

export const updateWardValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid name',
      custom: {
        options: async (value, { req }) => {
          const id = req.params.id;
          const findOptions: FindWardOption = { id };
          const isWardExist = await wardsServices.findWardByOption(findOptions);
          if (!isWardExist) {
            throw new Error('Ward does not exist in system');
          }
          return true;
        }
      }
    },
    districtId: {
      notEmpty: true,
      isNumeric: true,
      custom: {
        options: async (value, { req }) => {
          const { name, districtId } = req.body;
          const findOptions: FindWardOption = { name, districtId };
          const isWardExist = await wardsServices.findWardByOption(findOptions);
          if (isWardExist) {
            throw new Error('Ward is already in system');
          }
          return true;
        }
      }
    }
  })
);

export const createDistrictValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid name',
      custom: {
        options: async (value, { req }) => {
          const { name } = req.body;
          const findOptions: FindDistrictOption = { name };
          const isDistrictExist = await districtsServices.findDistrictByOption(findOptions);
          if (isDistrictExist) {
            throw new Error('District is already in system');
          }
          return true;
        }
      }
    }
  })
);

export const udpateDistrictValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid name',
      custom: {
        options: async (value, { req }) => {
          const id = req.params.id;
          const findOptionsId: FindDistrictOption = { id };
          const isDistrictIdExist = await districtsServices.findDistrictByOption(findOptionsId);
          if (!isDistrictIdExist) {
            throw new Error('District does not exist in system');
          }

          const { name } = req.body;
          const findOptionsName: FindDistrictOption = { name };
          const isDistrictNameExist = await districtsServices.findDistrictByOption(findOptionsName);
          if (isDistrictNameExist) {
            throw new Error('District name is already in system');
          }
          return true;
        }
      }
    }
  })
);

export const BoardReqValidator = validate(
  checkSchema({
    locationId: {
      isNumeric: true,
      notEmpty: true,
      errorMessage: 'Invalid location id'
    },
    boardType: {
      isNumeric: true,
      notEmpty: true,
      errorMessage: 'Invalid board type'
    },
    quantity: {
      isNumeric: true,
      notEmpty: true,
      errorMessage: 'Invalid quantity'
    },
    image1: {
      isString: true,
      errorMessage: 'Invalid image'
    },
    expireDate: {
      notEmpty: true,
      isISO8601: true,
      errorMessage: 'Invalid date'
    },
    width: {
      isFloat: true,
      errorMessage: 'Invalid width'
    },
    heigh: {
      isFloat: true,
      errorMessage: 'Invalid height'
    }
  })
);

export const OfficerToDistrictValidator = validate(
  checkSchema({
    userId: {
      notEmpty: true,
      isNumeric: true,
      errorMessage: 'Invalid name',
      custom: {
        options: async (value, { req }) => {
          const user = await myDataSource.getRepository(User).findOneBy({ id: req.body.userId });
          if (user == null || user.userType != 1) {
            throw new Error('User does not exist in system or User is not district officer');
          }
          return true;
        }
      }
    },
    districtId: {
      notEmpty: true,
      isNumeric: true,
      errorMessage: 'Invalid district id',
      custom: {
        options: async (value, { req }) => {
          const district = await myDataSource
            .getRepository(District)
            .createQueryBuilder('district')
            .where('district.id = :id', { id: req.body.districtId })
            .getOne();
          if (district == null) {
            throw new Error('District does not exist in system');
          }
          return true;
        }
      }
    }
  })
);

export const OfficerToWardValidator = validate(
  checkSchema({
    userId: {
      notEmpty: true,
      isNumeric: true,
      errorMessage: 'Invalid name',
      custom: {
        options: async (value, { req }) => {
          const user = await myDataSource.getRepository(User).findOneBy({ id: req.body.userId });
          if (user == null || user.userType != 2) {
            throw new Error('User does not exist in system or User is not district officer');
          }
          return true;
        }
      }
    },
    wardId: {
      notEmpty: true,
      isNumeric: true,
      errorMessage: 'Invalid ward id',
      custom: {
        options: async (value, { req }) => {
          const ward = await myDataSource
            .getRepository(Ward)
            .createQueryBuilder('ward')
            .where('ward.id = :id', { id: req.body.wardId })
            .getOne();
          if (ward == null) {
            throw new Error('Ward does not exist in system');
          }
          return true;
        }
      }
    }
  })
);
