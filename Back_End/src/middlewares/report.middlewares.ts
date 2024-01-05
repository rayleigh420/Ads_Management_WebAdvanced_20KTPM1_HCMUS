import { checkSchema } from 'express-validator';
import { validate } from '../utils/validator';

export const createReportValidate = validate(
  checkSchema(
    {
      reportType: {
        notEmpty: true,
        isNumeric: true,
        errorMessage: 'Invalid report type'
      },
      fullname: {
        notEmpty: true,
        isString: true,
        isLength: { options: { min: 6, max: 50 }, errorMessage: 'Fullname must be between 6 and 50 characters' },
        errorMessage: 'Invalid fullname'
      },
      email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Invalid email address'
      },
      phoneNumber: {
        notEmpty: true,
        isMobilePhone: true,
        errorMessage: 'Invalid phone number'
      },
      content: {
        notEmpty: true,
        isString: true,
        isLength: {
          options: { min: 20 },
          errorMessage: 'Content must be higher than 20 characters'
        }
      }
    },
    ['body']
  )
);
