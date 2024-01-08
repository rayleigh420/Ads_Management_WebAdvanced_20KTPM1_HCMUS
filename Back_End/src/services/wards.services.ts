import { FindWardOption } from '../models/requets/admin.requests';
import { myDataSource } from '../orm/connectDb';
import { Ward } from '../orm/entities/Ward';

class WardService {
  private wardRepository = myDataSource.getRepository(Ward);

  public async getListWards() {
    return await this.wardRepository.find();
  }

  public async getWardById(id: number) {
    return await this.wardRepository.findOneBy({ id });
  }

  public async findWardByOption(option: FindWardOption) {
    return await this.wardRepository.findOne({ where: option });
  }

  public async createWard(ward) {
    return await this.wardRepository.save(ward);
  }

  public async deleteWard(id: number) {
    return await this.wardRepository.delete({ id });
  }
}

export default new WardService();
