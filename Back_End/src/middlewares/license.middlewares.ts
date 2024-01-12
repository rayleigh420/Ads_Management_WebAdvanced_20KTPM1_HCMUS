import { checkSchema } from 'express-validator'
import { validate } from '../utils/validator'
import { myDataSource } from '../orm/connectDb'
import { AdvertisingBoard } from '../orm/entities/AdvertisingBoard'

export const createLicenseRequestValidator = validate(
  checkSchema({
    advertisingBoardId: {
      notEmpty: true,
      isNumeric: true,
      errorMessage: 'Invalid advertising board id',
      custom: {
        options: async (value, { req }) => {
          const board = await myDataSource
            .getRepository(AdvertisingBoard)
            .findOneBy({ id: req.body.advertisingBoardId })
          if (!board) {
            throw new Error('Board does not exist in system')
          }
          return true
        }
      }
    },
    emailOfCompany: {
      notEmpty: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid email address'
    },
    phoneNumberOfCompany: {
      notEmpty: true,
      isMobilePhone: true,
      errorMessage: 'Invalid phone number'
    },
    addressOfCompany: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid address',
      isLength: { options: { min: 6, max: 200 }, errorMessage: 'Adress must be between 6 and 200 characters' }
    },
    startDate: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid date'
    },
    endDate: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid date'
    }
  })
)
