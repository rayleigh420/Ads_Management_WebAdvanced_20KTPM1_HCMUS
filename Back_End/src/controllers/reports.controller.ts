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
import { sendMessageFirebase } from '../utils/firebase.util';
import { logger } from '../utils/logging.util';

export const createReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deviceId = req.headers.device_id as string;
    const images = req.files as Express.Multer.File[];
    const result = await reportsServices.createReport(req.body as ReportReqBody, images, deviceId);
    console.log('🚀 ~ createReport ~ result:', result);
    if (result) {
      if (result.locationId) {
        console.log('locationIds', result.locationId);
        const user = await reportsServices.findUserManageByLocationId(+result.locationId);
        console.log('🚀 ~ createReport ~ user:', user.ward.wardOfficiers[0].user.fcmToken);
        const fcmToken = user.ward.wardOfficiers[0].user.fcmToken;
        // const fcmToken =
        //   'cvJx4fmvNmXOUIUGGX_inf:APA91bEIEvEg72bK257VNf1PUEcIpweofp_QWavQtiYQG194H1x4lERxEzNBiFg8KRmwAXC49VsvCvtDz6_38SzECidDIUfPMWZ0ull79SrbYn_dbnGUNq_aLG1TA8mqSSxyK1nfgH1_';
        const title = 'Báo cáo vi phạm';
        const body = 'Có báo cáo vi phạm mới';
        sendMessageFirebase(fcmToken, title, body);
      }
    }
    logger.info(`created report`);
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getReportAnonymousByConditionController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction,
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
      parseInt(boardId, 10),
    );
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getReportByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reportId = req.params.id as string;
    const result = await reportsServices.getReportById(parseInt(reportId, 10));
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

    let results = await reportsServices.getReportForOfficer(parseInt(locationId, 10), parseInt(boardId, 10), wardId);
    results = results.slice().reverse();

    const count = results.length;
    let data: any;
    if (limit === 0 && skip === 0) {
      data = results;
    } else {
      data = results.splice((skip - 1) * limit, limit);
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
    console.log('🚀 ~ updateReportController ~ result:', result);
    if (result.status === ReportStatus.DONE && result.emailOfReporter) {
      console.log('send mail');
      sendMessageFirebase(result.deviceId, 'Báo cáo vi phạm', 'Báo cáo của bạn đã được xử lý');
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
    console.log('report.locationId', report.locationId);
    const location = await locationsServices.getLocationById(report.locationId);
    htmlOption = `<p>Báo cáo của bạn tại ${location.address} đã được xử lý.</p></br> <p>Chi tiết xử lý: ${report.handleMethod}</p> `;
    // if(report.emailOfReporter)
  } else {
    console.log('report.boardId', report.boardId);
    const board = await boardsServices.getBoardById(report.boardId);
    htmlOption = `<p>Báo cáo của bạn tại ${board.location.address} đã được xử lý.</p></br> <p>Chi tiết xử lý: ${report.handleMethod}</p> `;
  }
  const mailTo = report.emailOfReporter;
  const subject = 'Thông báo xử lý báo cáo bảng quảng cáo vi phạm';

  sendEmail(mailTo, subject, '', htmlOption);
};
