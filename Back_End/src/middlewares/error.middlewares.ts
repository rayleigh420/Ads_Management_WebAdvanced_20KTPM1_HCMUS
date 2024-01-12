import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/error'
import { ApiResponse } from '../models/responses/base.response'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err instanceof ErrorWithStatus) {
      res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(ApiResponse.error(JSON.stringify(omit(err, ['status']))))
      return
    }

    const finalError: any = {}

    Object.getOwnPropertyNames(err).forEach((key) => {
      if (
        !Object.getOwnPropertyDescriptor(err, key)?.configurable ||
        !Object.getOwnPropertyDescriptor(err, key)?.writable
      ) {
        return
      }
      finalError[key] = err[key]
    })

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(JSON.stringify(omit(finalError, ['stack']))))
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(JSON.stringify(error)))
  }
}
