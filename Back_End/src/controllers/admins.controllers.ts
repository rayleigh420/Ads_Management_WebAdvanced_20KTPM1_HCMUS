import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../models/responses/base.response';
import adminServices from '../services/admin.services';
import { OfficerToDistrict, OfficerToWard } from '../models/requets/admin.requests';
import licenseServices from '../services/license.services';
import reportsServices from '../services/reports.services';
import { getPagingData } from '../utils/paging.utils';
import { MonthlyStat, ReportStatResponse } from '../models/responses/admin.response'; // adjust the path to match the location of the admin.response file
import { Report } from '../orm/entities/Report';
import modificationsServices from '../services/modifications.services';
import { ModificationRequestStatus } from '../constants/enum';
import { logger } from '../utils/logging.util';
import { sendMessageFirebase } from '../utils/firebase.util';

export const addOfficerToDistrict = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.addOfficerToDistrict(req.body as OfficerToDistrict);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const addOfficerToWard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.addOfficerToWard(req.body as OfficerToWard);
    res.json(ApiResponse.success(result));
} catch (error) {
    next(error);
  }
};

export const approveLicense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await licenseServices.approveLicense(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const cancelLicense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await licenseServices.deleteLicense(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListReportInWardofLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('getListReportInWardofLocation');
    const result = await reportsServices.getListReportInWardofLocation(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getListReportInWardOfBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reportsServices.getListReportInWardOfBoard(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListReportInDistrictofLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reportsServices.getListReportInDistrictOfLocation(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListReportInDistrictOfBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('getListReportInDistrictOfBoard');
    const result = await reportsServices.getListReportInDistrictOfBoard(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListModificationRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    let results = await adminServices.getListModificationRequest();
    results = results.slice().reverse();
    const count = results.length;
    let data: any;
    if (limit === 0 && skip === 0) {
      data = results;
    } else {
      data = results.splice((skip - 1) * limit, limit);
    }
    const dataPaging = getPagingData({ data, count, limit, skip });
    return res.json(ApiResponse.success(dataPaging, 'success'));
    logger.info('getListModificationRequest');
  } catch (error) {
    next(error);
  }
};

export const getListAdsBoardType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('getListAdsBoardType');
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    let results = await adminServices.getListAdsBoardType();
    results = results.slice().reverse();

    const count = results.length;
    let data: any;
    if (limit === 0 && skip === 0) {
      data = results;
    } else {
      data = results.splice((skip - 1) * limit, limit);
    }
    const dataPaging = getPagingData({ data, count, limit, skip });
    return res.json(ApiResponse.success(dataPaging, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getAdsBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.getAdsBoardTypeById(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
export const updateAdsBoardType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateAdsBoardTypeBody = req.body as { name: string };
    const result = await adminServices.updateAdsBoardType(parseInt(req.params.id), updateAdsBoardTypeBody.name);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const deleteAdsBoardType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.deleteAdsBoardType(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const createAdsBoardType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createAdsBoardTypeBody = req.body as { name: string };
    const result = await adminServices.createAdsBoardType(createAdsBoardTypeBody.name);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getListReportForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    let results = await adminServices.getListReportForm();
    results = results.slice().reverse();

    const count = results.length;
    let data: any;
    if (limit === 0 && skip === 0) {
      data = results;
    } else {
      data = results.splice((skip - 1) * limit, limit);
    }
    const dataPaging = getPagingData({ data, count, limit, skip });
    return res.json(ApiResponse.success(dataPaging, 'success'));
  } catch (error) {
    next(error);
  }
};

export const getReportFormById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.getReportFormById(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
export const updateReportForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateAdsBoardTypeBody = req.body as { name: string };
    const result = await adminServices.updateReportForm(parseInt(req.params.id), updateAdsBoardTypeBody.name);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const deleteReportForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.deleteReportForm(parseInt(req.params.id));
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const createReportForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createAdsBoardTypeBody = req.body as { name: string };
    const result = await adminServices.createReportForm(createAdsBoardTypeBody.name);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

//statistic
export const getReportStat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getReportStatRequestBody = req.body as { year: number; wardId: number };
    const year = req.query.year ? parseInt(req.query.year as string) : null;
    console.log('🚀 ~ getReportStat ~ year:', year);
    const wardId = req.params.id ? parseInt(req.params.id) : undefined;
    const reportList = await reportsServices.getReportForOfficer(undefined, undefined, wardId);
    console.log('🚀 ~ getReportStat ~ reportList:', reportList);
    const availableYears = [...new Set(reportList.map((r) => r.createdAt!.getFullYear()))] as number[];
    let targetYear = 0;

    if (!year) {
      targetYear = new Date().getFullYear();
    } else {
      targetYear = year;
    }

    const reportStatResponse: ReportStatResponse = {
      currentYear: targetYear,
      availableYears: availableYears,
      monthlyStats:
        targetYear === 0
          ? getAggregatedYearlyStats(reportList, availableYears)
          : getMonthlyStats(reportList, targetYear),
    };

    res.json(ApiResponse.success(reportStatResponse));
  } catch (error) {
    next(error);
  }
};

const getMonthlyStats = (listReport: Report[], year: number): MonthlyStat[] => {
  const monthlyStats: MonthlyStat[] = [];
  const reportCurrentYear = listReport.filter((r) => r.createdAt!.getFullYear() === year);

  if (!listReport.length) {
    return monthlyStats;
  }

  const maxMonth = 12;

  for (let i = 1; i <= maxMonth; i++) {
    const month = new Date(year, i - 1, 1).toLocaleString('default', { month: 'long' });
    const numberOfReport = reportCurrentYear.filter((p) => p.createdAt!.getMonth() + 1 === i).length;

    monthlyStats.push({
      month: month,
      numberOfReport: numberOfReport,
    });
  }

  return monthlyStats;
};

const getAggregatedYearlyStats = (listReport: Report[], availableYears: number[]): MonthlyStat[] => {
  const aggregatedYearlyStats: MonthlyStat[] = [];

  for (const year of availableYears) {
    const monthlyStatsForYear = getMonthlyStats(listReport, year);

    for (const monthlyStat of monthlyStatsForYear) {
      const existingStat = aggregatedYearlyStats.find((stat) => stat.month === monthlyStat.month);

      if (existingStat) {
        existingStat.numberOfReport += monthlyStat.numberOfReport;
      } else {
        aggregatedYearlyStats.push({
          month: monthlyStat.month,
          numberOfReport: monthlyStat.numberOfReport,
        });
      }
    }
  }

  return aggregatedYearlyStats;
};

export const approveModificationRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await modificationsServices.approveModificationRequest(
      parseInt(req.params.id),
      ModificationRequestStatus.APPROVED,
    );
    if (result) {
      sendMessageFirebase('cvJx4fmvNmXOUIUGGX_inf:APA91bEIEvEg72bK257VNf1PUEcIpweofp_QWavQtiYQG194H1x4lERxEzNBiFg8KRmwAXC49VsvCvtDz6_38SzECidDIUfPMWZ0ull79SrbYn_dbnGUNq_aLG1TA8mqSSxyK1nfgH1_', 'Yêu cầu chỉnh sửa', 'Yêu cầu chỉnh sửa đã được chấp nhận');
    }
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const cancelModificationRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await modificationsServices.approveModificationRequest(
      parseInt(req.params.id),
      ModificationRequestStatus.REJECTED,
    );
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
