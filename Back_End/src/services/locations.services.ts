// import { Board } from "../entities/board.entity";
import { UserType } from '../models/requets/user.requests';
import { myDataSource } from '../orm/connectDb';
import { AdvertisingLocation } from '../orm/entities/AdvertisingLocation';
import { District } from '../orm/entities/District';
import { Ward } from '../orm/entities/Ward';
import reportsServices from './reports.services';

class LocationService {
  private locationRepository = myDataSource.getRepository(AdvertisingLocation);
  private wardRepository = myDataSource.getRepository(Ward);
  private districtRepository = myDataSource.getRepository(District);

  public async getLocations({ limit, skip }: { limit: number; skip: number }) {
    if (limit === 0 && skip === 0) {
      return await this.locationRepository
        .createQueryBuilder('location')
        .leftJoinAndSelect('location.ward', 'ward')
        // .leftJoinAndSelect('location.district', 'district')
        .getMany();
    }
    return await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      // .leftJoinAndSelect('location.district', 'district')
      .skip(skip)
      .take(limit)
      .getMany();
  }

  // public async getLocationsByWardId({ limit, skip, wardId }: { limit: number; skip: number, wardId: number }) {
  //   const queryBuilder = this.wardRepository
  //     .createQueryBuilder('ward')
  //     .leftJoinAndSelect('ward.advertisingLocations', 'locations')
  //     // .leftJoinAndSelect('location.district', 'district')
  //     .where('ward.id = :wardId', { wardId });

  //   if (limit > 0 || skip > 0) {
  //     queryBuilder.skip(skip).take(limit);
  //   }

  //   return await queryBuilder.getMany();
  // }

  // public async getLocationsByDistrictId({ limit, skip, districtId, listWardId }: { limit: number; skip: number, districtId: number, listWardId: number[] }) {
  //   const queryBuilder = this.districtRepository
  //     .createQueryBuilder('district')
  //     .leftJoinAndSelect('district.wards', 'wards')
  //     .leftJoinAndSelect('wards.advertisingLocations', 'locations')
  //     // .leftJoinAndSelect('location.district', 'district')
  //     .where('district.id = :districtId', { districtId })
  //     .andWhere('wards.id IN (:...listWardId)', { listWardId });

  //   if (limit > 0 || skip > 0) {
  //     queryBuilder.skip(skip).take(limit);
  //   }

  //   return await queryBuilder.getMany();
  // }

  public async getLocationsAnonymous(deviceId: string) {
    const locations = await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      .leftJoinAndSelect('location.reports', 'reports')
      .innerJoinAndSelect('location.advertisingBoards', 'boards')
      // .where('reports.deviceId = :deviceId', { deviceId })
      .getMany();

    const result = locations.map((location) => {
      location.reports = location.reports.filter(report => report.deviceId === deviceId);
      return location;
    });

    return result;
  }

  public async getLocationsAnonymousById(id: number) {
    return this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      .where('location.id = :id', { id })
      .getOne();
  }

  public async getBoardsByLocationId(id: number) {
    return this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.advertisingBoards', 'boards')
      .leftJoinAndSelect('boards.reports', 'reports')
      .where('location.id = :id', { id })
      .getOne();
  }

  public async getLocationById(id: number) {
    return this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      .where('location.id = :id', { id })
      .getOne();
  }

  public async getLocationManageByUserId(userId: number, userType: UserType, wardIds: number[]) {
    const locations: AdvertisingLocation[] = [];
  
    const addReportsToLocations = async (advertisingLocations: AdvertisingLocation[]) => {
      for (const item of advertisingLocations) {
        const reports = await reportsServices.getReportAnonymousByLocationId(item.id);
        const location = { ...item, reports };
        locations.push(location);
      }
    };
  
    if (userType === UserType.WARD_OFFICER) {
      const result = await this.wardRepository.createQueryBuilder('ward')
        .leftJoinAndSelect('ward.wardOfficiers', 'wardOfficiers')
        .where('wardOfficiers.userId = :userId', { userId })
        .leftJoinAndSelect('ward.advertisingLocations', 'locations')
        .getMany();
  
      await addReportsToLocations(result[0].advertisingLocations);
    } else if (userType === UserType.DISTRICT_OFFICER) {
      const result = await this.districtRepository.createQueryBuilder('district')
        .leftJoinAndSelect('district.districtOfficiers', 'districtOfficiers')
        .where('districtOfficiers.userId = :userId', { userId })
        .leftJoinAndSelect('district.wards', 'wards')
        .leftJoinAndSelect('wards.advertisingLocations', 'locations')
        .getMany();
  
      const wards = result[0].wards as Ward[];
      for (const ward of wards) {
        if (ward.advertisingLocations.length > 0 && (wardIds.length > 0 ? wardIds.includes(ward.id) : true)) {
          await addReportsToLocations(ward.advertisingLocations);
        }
      }
    }
  
    return locations;
  }
}
export default new LocationService();
