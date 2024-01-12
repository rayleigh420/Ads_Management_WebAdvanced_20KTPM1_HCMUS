import { OfficerToDistrict, OfficerToWard } from '../models/requets/admin.requests';
import { myDataSource } from '../orm/connectDb';
import { District } from '../orm/entities/District';
import { DistrictOfficier } from '../orm/entities/DistrictOfficier';
import { ModificationRequest } from '../orm/entities/ModificationRequest';
import { User } from '../orm/entities/User';
import { Ward } from '../orm/entities/Ward';
import { WardOfficier } from '../orm/entities/WardOfficier';

class AdminService {
  private districOfficerRepository = myDataSource.getRepository(DistrictOfficier);
  private wardOfficerRepository = myDataSource.getRepository(WardOfficier);
  private modificationRequestRepository = myDataSource.getRepository(ModificationRequest);

  private userRepsitory = myDataSource.getRepository(User);
  private districtRepository = myDataSource.getRepository(District);
  private wardRepository = myDataSource.getRepository(Ward);

  public async addOfficerToDistrict({ userId, districtId }: OfficerToDistrict) {
    const user = this.userRepsitory.findOneBy({ id: userId });
    const district = this.districtRepository.findOneBy({ id: districtId });

    if (user != null && district != null) {
      const districtOfficer = new DistrictOfficier();
      districtOfficer.userId = userId;
      districtOfficer.manageDistrictId = districtId;
      return await this.districOfficerRepository.save(districtOfficer);
    }
  }

  public async addOfficerToWard({ userId, wardId }: OfficerToWard) {
    const user = this.userRepsitory.findOneBy({ id: userId });
    const ward = this.wardRepository.findOneBy({ id: wardId });

    if (user != null && ward != null) {
      const wardOfficer = new WardOfficier();
      wardOfficer.userId = userId;
      wardOfficer.manageWardId = wardId;
      return await this.wardOfficerRepository.save(wardOfficer);
    }
  }

  public async getListModificationRequest() {
    return await this.modificationRequestRepository
      .createQueryBuilder('modificationRequest')
      .leftJoinAndSelect('modificationRequest.board', 'board')
      .leftJoinAndSelect('modificationRequest.newLocation', 'newLocation')
      .getMany();
  }
}

export default new AdminService();
