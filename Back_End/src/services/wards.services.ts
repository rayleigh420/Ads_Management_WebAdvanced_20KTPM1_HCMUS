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

  public async deleteWard(id: number) {
    return await this.wardRepository.delete({ id });
  }
}

export default new WardService();
