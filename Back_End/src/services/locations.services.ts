// import { Board } from "../entities/board.entity";
import { myDataSource } from '../orm/connectDb';
import { AdvertisingLocation } from '../orm/entities/AdvertisingLocation';

class LocationService {
  private locationRepository = myDataSource.getRepository(AdvertisingLocation);

  public async getLocations({ limit, skip }: { limit: number; skip: number }) {
    if (limit === 0) {
      return await this.locationRepository
        .createQueryBuilder('location')
        .leftJoinAndSelect('location.ward', 'ward')
        // .leftJoinAndSelect('location.district', 'district')
        .getManyAndCount();
    }
    return await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      // .leftJoinAndSelect('location.district', 'district')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  }

  public async getLocationsAnonymous() {
    return await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ward', 'ward')
      // .leftJoinAndSelect('location.district', 'district')
      .getManyAndCount();
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
}

export default new LocationService();
