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
