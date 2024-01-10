import { JsonWebTokenError } from 'jsonwebtoken'
import { envConfig } from '../constants/config'
import { ErrorWithStatus } from '../models/error'
import { verifyToken } from './jwt.utils'
import { capitalize } from 'lodash'
import HTTP_STATUS from '../constants/httpStatus'
import { USER_MESSAGES } from '../constants/message'

export const verifyAccessToken = async (accessToken: string, req?: any, userType?: number) => {
  if (!accessToken) {
    console.log('need access token')
    throw new ErrorWithStatus({
      message: 'Access token is required',
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
  try {
    console.log('need access token2')

    const decodedAuthorization = await verifyToken(accessToken, envConfig.jwtSecretAccessToken as string)
    if (userType != null) {
      console.log(userType)
      if (decodedAuthorization.userType != userType) {
        throw new ErrorWithStatus({
          message: capitalize(USER_MESSAGES.NOT_ACCESS_PERMISSION),
          status: HTTP_STATUS.FORBIDDEN
        })
      }
    }
    if (req) {
      req.decodedAuthorization = decodedAuthorization
      return true
    }
    return decodedAuthorization
  } catch (error) {
    throw new ErrorWithStatus({
      message: capitalize((error as JsonWebTokenError).message),
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
}
