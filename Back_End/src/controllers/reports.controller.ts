import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ApiResponse } from '../models/responses/base.response';
import reportsServices from '../services/reports.services';
import { ReportReqBody, UpdateReportBody } from '../models/requets/report.requests';
import { getPagingData } from '../utils/paging.utils';
import usersServices from '../services/users.services';
import { Report } from '../orm/entities/Report';
import locationsServices from '../services/locations.services';
import { sendEmail } from '../utils/mailing.util';
import { ReportStatus } from '../constants/enum';
import boardsServices from '../services/boards.services';

export const createReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('report', req.body.reportType);
    const deviceId = req.headers.device_id as string;
    const result = await reportsServices.createReport(req.body as ReportReqBody, req.file, deviceId);
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getReportAnonymousByConditionController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    // const reportType = req.query.reportType as string;
    const locationId = req.query.locationId as string;
    const boardId = req.query.boardId as string;
    const deviceId = req.headers.device_id as string;
    console.log('🚀 ~ deviceId:', deviceId);
    const result = await reportsServices.getReportAnonymousByDeviceId(
      deviceId,
      parseInt(locationId, 10),
      parseInt(boardId, 10)
    );
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getReportByConditionController = async (req: any, res: Response, next: NextFunction) => {
  try {
    // const reportType = req.query.reportType as string;
    const userId = req.decodedAuthorization.userId;
    const locationId = req.query.locationId as string;
    const boardId = req.query.boardId as string;
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    const wardOfficer = await usersServices.getWardOfficerByUserId(parseInt(userId, 10));
    const wardId = wardOfficer.manageWardId;

    const results = await reportsServices.getReportForOfficer(parseInt(locationId, 10), parseInt(boardId, 10), wardId);
    const count = results.length;
    let data: any;
    if (limit === 0 && skip === 0) {
      data = results;
    } else {
      data = results.splice(skip, limit);
    }

    const dataPaging = getPagingData({ data, count, limit, skip });
    res.json(ApiResponse.success(dataPaging, 'success'));
  } catch (error) {
    next(error);
  }
};

export const updateReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateReportBody = req.body as UpdateReportBody;
    const result = await reportsServices.updateReport(updateReportBody);
    console.log("🚀 ~ updateReportController ~ result:", result)
    if (result.status === ReportStatus.DONE && result.emailOfReporter) {
      console.log('send mail');
      await sendMailToResidentUpdateReport(result);
    }
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    next(error);
  }
};

const sendMailToResidentUpdateReport = async (report: Report) => {
  let htmlOption = '';
  if (report.locationId) {
    console.log('report.locationId', report.locationId)
    const location = await locationsServices.getLocationById(report.locationId);
    htmlOption = `<p>Báo cáo của bạn tại ${location.address} đã được xử lý.</p></br> <p>Chi tiết xử lý: ${report.handleMethod}</p> `;
    // if(report.emailOfReporter)
  } else {
    console.log('report.boardId', report.boardId)
    const board = await boardsServices.getBoardById(report.boardId);
    htmlOption = `<p>Báo cáo của bạn tại ${board.location.address} đã được xử lý.</p></br> <p>Chi tiết xử lý: ${report.handleMethod}</p> `;
  }
  const mailTo = report.emailOfReporter;
  const subject = 'Thông báo xử lý báo cáo bảng quảng cáo vi phạm';

  sendEmail(mailTo, subject, '' , htmlOption);
};
