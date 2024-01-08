import { checkSchema } from 'express-validator';
import { validate } from '../utils/validator';
import { FindDistrictOption, FindWardOption, WardReqBody } from '../models/requets/admin.requests';
import wardsServices from '../services/wards.services';
import districtsServices from '../services/districts.services';

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
          const { districtId } = req.body;
          const findOptions: FindWardOption = { districtId };
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
