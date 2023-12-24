import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiResponse } from '../models/responses/base.response';

// export const wrapRequestHandler = <P>(func: RequestHandler<P, ApiResponse<any>, any, any>) => {
//   return async (req: Request<P>, res: Response<ApiResponse<any>>, next: NextFunction) => {
//     try {
//       await func(req, res, next);
//     } catch (error) {
//       // If the controller throws an error, wrap it in an error ApiResponse
//       res.status(500).json(ApiResponse.error('Internal server error'));
//     }
//   };
// };

// function isApiResponse<T>(value: any): value is ApiResponse<T> {
//   return value instanceof ApiResponse;
// }

// export const wrapRequestHandler = <P>(func: RequestHandler<P, any, any, any>) => {
//   return async (req: Request<P>, res: Response, next: NextFunction) => {
//     try {
//       await func(req, res, next)
//     } catch (error) {
//       next(error)
//     }
//   }
// }

export const wrapRequestHandler = <P>(func: RequestHandler<P, ApiResponse<any>, any, any>) => {
  return async (req: Request<P>, res: Response<ApiResponse<any>>, next: NextFunction) => {
    try {
      const result = await func(req, res, next);

      // If headers have already been sent, do nothing
      if (res.headersSent) {
        return;
      }

      // If the controller returns a non-ApiResponse, assume success and wrap it
      if (!isApiResponse(result)) {
        res.json(ApiResponse.success(result));
      }
    } catch (error) {
      // If headers have already been sent, do nothing
      if (res.headersSent) {
        return;
      }

      // If the controller throws an error, wrap it in an error ApiResponse
      next(ApiResponse.error(error.message));
    }
  };
};

// Type guard for ApiResponse
function isApiResponse<T>(value: any): value is ApiResponse<T> {
  return value instanceof ApiResponse;
}
