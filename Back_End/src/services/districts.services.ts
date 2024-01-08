import { myDataSource } from '../orm/connectDb';
import { District } from '../orm/entities/District';

class DistrictService {
  private districtRepository = myDataSource.getRepository(District);

  public async getListDistricts() {
    return await this.districtRepository.find();
  }

  public async getDistrictById(id: number) {
    return await this.districtRepository.findOneBy({ id });
  }

  public async deleteDistrict(id: number) {
    return await this.districtRepository.delete({ id });
  }
}

export default new DistrictService();
