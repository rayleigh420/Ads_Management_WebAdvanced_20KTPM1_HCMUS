import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';
import HTTP_STATUS from '../constants/httpStatus';
import { ErrorWithStatus, EntityError } from '../models/error';
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const errorsObject = errors.mapped();
    console.log('🚀 ~ file: validator.ts:15 ~ return ~ errorsObject:', errorsObject);
    const entityError = new EntityError({ errors: {} });
    for (const key in errorsObject) {
      const { msg } = errorsObject[key];
      //error is not validation error
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        console.log('🚀 ~ file: validator.ts:18 ~ return ~ msg.statu:', msg.status);
        return next(msg);
      }
      entityError.errors[key] = errorsObject[key];
      console.log('🚀 ~ file: validator.ts:28 ~ return ~ entityError.errors[key]:', entityError.errors[key]);
    }
    // res.status(422).json({ errors: errors.mapped() });
    next(entityError);
  };
};
