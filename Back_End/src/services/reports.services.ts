// import { Board } from "../entities/board.entity";
import { Like, createQueryBuilder } from 'typeorm';
import { ReportType } from '../constants/enum';
import { ReportReqBody, UpdateReportBody } from '../models/requets/report.requests';
import { myDataSource } from '../orm/connectDb';
import { AdvertisingLocation } from '../orm/entities/AdvertisingLocation';
import { District } from '../orm/entities/District';
import { Report } from '../orm/entities/Report';
import { Ward } from '../orm/entities/Ward';
import uploadToCloudinary from '../utils/cloudinary.util';

class ReportService {
  private reportRepository = myDataSource.getRepository(Report);
  private districtRepository = myDataSource.getRepository(District);
  private wardRepository = myDataSource.getRepository(Ward);
  private advertisingLocationRepository = myDataSource.getRepository(AdvertisingLocation);

  public async getListReportInWardofLocation(id: number) {
    return await this.wardRepository
      .createQueryBuilder('ward')
      .leftJoinAndSelect('ward.advertisingLocations', 'advertisingLocations', 'ward.id = :id', {
        id: id,
      })
      .leftJoinAndSelect('advertisingLocations.reports', 'report')
      .where('report.locationId IS NOT NULL')
      .getOne();
  }

  public async getListReportInWardOfBoard(id: number) {
    return await this.wardRepository
      .createQueryBuilder('ward')
      .leftJoinAndSelect('ward.advertisingLocations', 'advertisingLocations', 'ward.id = :id', {
        id: id,
      })
      .leftJoinAndSelect('advertisingLocations.reports', 'report')
      .where('report.boardId IS NOT NULL')
      .getOne();
  }

  public async getListReportInDistrictOfLocation(id: number) {
    return await this.districtRepository
      .createQueryBuilder('district')
      .leftJoinAndSelect('district.wards', 'ward', 'district.id = :id', {
        id: id,
      })
      .leftJoinAndSelect('ward.advertisingLocations', 'advertisingLocations')
      .leftJoinAndSelect('advertisingLocations.reports', 'report')
      .where('report.locationId IS NOT NULL')
      .getOne();
  }

  public async getListReportInDistrictOfBoard(id: number) {
    return await this.districtRepository
      .createQueryBuilder('district')
      .leftJoinAndSelect('district.wards', 'ward', 'district.id = :id', {
        id: id,
      })
      .leftJoinAndSelect('ward.advertisingLocations', 'advertisingLocations')
      .leftJoinAndSelect('advertisingLocations.reports', 'report')
      .where('report.boardId IS NOT NULL')
      .getOne();
  }

  public async createReport(payload: ReportReqBody, images: Express.Multer.File[], deviceId: string) {
    if (!images || images.length == 0) {
      throw new Error('Please upload a file');
    }

    const imageUrls = await Promise.all(images.map((image) => uploadToCloudinary(image)));
    console.log('🚀 ~ ReportService ~ createReport ~ imageUrls:', imageUrls);

    const {
      reportType,
      locationId,
      districtName,
      wardName,
      address,
      lat,
      long,
      boardId,
      reportForm,
      fullname,
      email,
      phoneNumber,
      content,
    } = payload;

    let location: any;
    console.log('reportType', reportType);
    console.log('reportTypeenum', ReportType.LOCATION);
    console.log('locationId', locationId);
    // console.log("check ", reportType == ReportType.LOCATION && locationId == undefined);
    // return
    if (reportType == ReportType.LOCATION && locationId == undefined) {
      const district = await this.districtRepository.findOne({ where: { name: Like(`%${districtName}%`) } });

      if (!district) {
        throw new Error('District not found');
      }
      console.log('dítrict', district);
      console.log('🚀 ~ file: reports.services.ts:45 ~ ReportService ~ createReport ~ wardName:', wardName);

      const ward = await this.wardRepository.findOne({
        where: {
          district: { id: district.id },
          name: Like(`%${wardName}%`),
        },
      });

      if (!ward) {
        throw new Error('Ward not found');
      }
      console.log('ward', ward);

      const newLocation = this.advertisingLocationRepository.create({ address, lat, long, wardId: ward.id });
      location = await this.advertisingLocationRepository.save(newLocation);
      const locationId = location.id;
    }

    const report = this.reportRepository.create({
      locationId: location?.id || locationId,
      boardId,
      reportForm,
      fullnameOfReporter: fullname,
      emailOfReporter: email,
      phoneNumberOfReporter: phoneNumber,
      content,
      image1: imageUrls[0].url,
      image2: imageUrls[1]?.url,
      deviceId,
    });

    return await this.reportRepository.save(report);
  }
  public async getReportAnonymousByLocationId(locationId: number, reportId?: number) {
    const whereCondition = reportId ? { locationId, id: reportId } : { locationId };
    return await this.reportRepository.find({ where: whereCondition });
  }

  public async getReportAnonymousByDeviceId(deviceId: string = '', locationId?: number, boardId?: number) {
    if (locationId) {
      return await this.reportRepository.find({ where: { deviceId, locationId } });
    } else {
      const result = await this.reportRepository.find({ where: { deviceId, boardId } });
      console.log('🚀 ~ file: reports.services.ts:84 ~ ReportService ~ getReportAnonymousByDeviceId ~ result:', result);
      return result;
    }
  }

  public async getReportForOfficer(locationId?: number, boardId?: number, wardId?: number) {
    if (locationId) {
      return await this.reportRepository.find({ where: { locationId } });
    } else if (boardId) {
      const result = await this.reportRepository.find({ where: { boardId } });
      console.log('🚀 ~ file: reports.services.ts:84 ~ ReportService ~ getReportAnonymousByDeviceId ~ result:', result);
      return result;
    } else {
      //find all location in ward
      console.log('all location in ward');
      const locations = await this.advertisingLocationRepository
        .createQueryBuilder('location')
        .leftJoinAndSelect('location.ward', 'ward')
        .where('ward.id = :wardId', { wardId })
        .leftJoinAndSelect('location.reports', 'reports')
        .leftJoinAndSelect('location.advertisingBoards', 'advertisingBoards')
        .leftJoinAndSelect('advertisingBoards.reports', 'boardReports')
        .getMany();
      //find all report in location and report in board in location
      const reports: any = [];

      locations.forEach((location) => {
        if (location.reports.length > 0) {
          reports.push(...location.reports);
        }
        const advertisingBoards = location.advertisingBoards;
        advertisingBoards.forEach((board) => {
          reports.push(...board.reports);
        });
      });

      return reports;
    }
  }

  public async updateReport(payload: UpdateReportBody) {
    const { id, status, handleMethod } = payload;
    console.log('🚀 ~ ReportService ~ updateReport ~ payload:', payload);
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new Error('Report not found');
    }
    report.status = status;
    report.handleMethod = handleMethod;
    return await this.reportRepository.save(report);
  }

  public async getReportById(id: number) {
    return await this.reportRepository.findOne({ where: { id } });
  }

  public async findUserManageByLocationId(locationId: number) {
    console.log('=====check');
    const result = await this.advertisingLocationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      .leftJoinAndSelect('ward.wardOfficiers', 'wardOfficer')
      .leftJoinAndSelect('wardOfficer.user', 'user')
      .where('location.id = :locationId', { locationId })
      .getOne();

    console.log('🚀 ~ file: reports.services.ts:84 ~ ReportService ~ getReportAnonymousByDeviceId ~ result:', result);
    return result;
  }

  public async getReportByWardId(wardId: number) {
    const result = await this.reportRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.location', 'location')
      .leftJoinAndSelect('location.ward', 'ward')
      .where('ward.id = :wardId', { wardId })
      .getMany();

    console.log('🚀 ~ file: reports.services.ts:84 ~ ReportService ~ getReportAnonymousByDeviceId ~ result:', result);
    return result;
  }
}

export default new ReportService();
