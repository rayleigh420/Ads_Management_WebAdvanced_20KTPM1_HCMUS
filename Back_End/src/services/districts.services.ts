import { FindDistrictOption } from '../models/requets/admin.requests';
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

  public async findDistrictByOption(option: FindDistrictOption) {
    return await this.districtRepository.findOne({ where: option });
  }

  public async createDistrict(district) {
    return await this.districtRepository.save(district);
  }

  public async deleteDistrict(id: number) {
    console.log(id);
    return await this.districtRepository.delete({ id });
  }
}

export default new DistrictService();
