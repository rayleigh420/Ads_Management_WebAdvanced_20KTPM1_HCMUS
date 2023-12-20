import { NextFunction, Response, Request } from 'express'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json(omit(err, ['status']))
}
