// import { Board } from "../entities/board.entity";
import { myDataSource } from '../orm/connectDb';
import { AdvertisingLocation } from '../orm/entities/AdvertisingLocation';

class LocationService {
  private locationRepository = myDataSource.getRepository(AdvertisingLocation);

  public async getLocations({ limit, skip }: { limit: number; skip: number }) {
    return await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('board.ward', 'ward')
      // .leftJoinAndSelect('location.district', 'district')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  }
}

export default new LocationService();
