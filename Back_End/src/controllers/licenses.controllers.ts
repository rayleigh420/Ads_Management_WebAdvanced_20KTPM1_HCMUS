import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from '../models/responses/base.response'
import licenseServices from '../services/license.services'
import { LicenseReqBody } from '../models/requets/license.request'
import { extend } from 'lodash'

export const getListLicenseRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await licenseServices.getListLicense()
    res.json(ApiResponse.success(result))
  } catch (error) {
    next(error)
  }
}

export const createLicenseRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await licenseServices.createLicenseRequest(req.body as LicenseReqBody)
    res.json(ApiResponse.success(result))
  } catch (error) {
    next(error)
  }
}

export const deleteLicense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await licenseServices.deleteLicense(parseInt(req.params.id))
    res.json(ApiResponse.success(result))
  } catch (error) {
    next(error)
  }
}
