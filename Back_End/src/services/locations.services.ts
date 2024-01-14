// import { Board } from "../entities/board.entity";
import { LocationReqBody } from '../models/requets/location.request';
import { UserType } from '../models/requets/user.requests';
import { myDataSource } from '../orm/connectDb';
import { AdvertisingLocation } from '../orm/entities/AdvertisingLocation';
import { District } from '../orm/entities/District';
import { Ward } from '../orm/entities/Ward';
import uploadToCloudinary from '../utils/cloudinary.util';
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

  public async getListLocation() {
    return this.locationRepository.find();
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
      .leftJoinAndSelect('location.advertisingBoards', 'boards')
      .getMany();

    // const result = locations.filter((location) => {
    //   const hasReportWithDeviceId = location.reports.some((report) => report.deviceId === deviceId);
    //   return hasReportWithDeviceId || location.advertisingBoards.length > 0;
    // });

    return locations;
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

  public async getLocationManageWard(wardId: number) {

    const locations = await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      .leftJoinAndSelect('location.reports', 'reports')
      .leftJoinAndSelect('location.advertisingBoards', 'boards')
      .leftJoinAndSelect('boards.reports', 'boardReports')
      .where('ward.id = :wardId', { wardId })
      // .where('reports.deviceId = :deviceId', { deviceId })
      .getMany();

    return locations;
  }

  public async getLocationHaveLicenseManageWard(wardId: number) {

    const locations = await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      .leftJoinAndSelect('location.reports', 'reports')
      .leftJoinAndSelect('location.advertisingBoards', 'boards')
      .leftJoinAndSelect('boards.reports', 'boardReports')
      .leftJoinAndSelect('boards.license', 'license')
      // .andWhere('boards.licenseId IS NOT NULL')
      .where('ward.id = :wardId', { wardId })
      // .where('reports.deviceId = :deviceId', { deviceId })
      .getMany();

      locations.forEach(location => {
        location.advertisingBoards = location.advertisingBoards.filter(board => board.licenseId !== null);
      });

    return locations;
  }


  public async getLocationByWardIdAndLocationId(wardId: number, locationId) {
    return await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      .where('ward.id = :wardId', { wardId })
      .andWhere('location.id = :locationId', { locationId })
      .getMany();
  }

  public async getLocationByWardId(wardId: number) {
    return await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      .where('ward.id = :wardId', { wardId })
      .getMany();
  }

  public async createLocation(location: LocationReqBody, images: Express.Multer.File[]) {
    if (images || images.length !== 0) {
      // throw new Error('Please upload a file');
      const imageUrls = await Promise.all(images.map((image) => uploadToCloudinary(image)));
      location.image1 = imageUrls[0]?.url;
      location.image2 = imageUrls[1]?.url; // Use optional chaining in case there's only one image
    }

    // Assuming board has properties image1 and image2 to store the image URLs

    return this.locationRepository.save(location);
  }

  public async updateLocation(id: number, location: LocationReqBody, images?: Express.Multer.File[]) {
    const newLocation = await this.locationRepository.findOneBy({ id });

    if (images && images.length > 0) {
      console.log('check file', images);
      const imageUrls = await Promise.all(images.map((image) => uploadToCloudinary(image)));
      newLocation.image1 = imageUrls[0]?.url;
      newLocation.image2 = imageUrls[1]?.url;
    }

    newLocation.lat = location.lat;
    newLocation.long = location.long;
    newLocation.address = location.address;
    newLocation.locationType = location?.locationType;
    newLocation.advertisingType = location?.advertisingType;
    newLocation.isPlanned = location?.isPlanned;

    return this.locationRepository.save(newLocation);
  }

  public async deleteLocation(id: number) {
    return this.locationRepository.delete({ id });
  }
}
export default new LocationService();
