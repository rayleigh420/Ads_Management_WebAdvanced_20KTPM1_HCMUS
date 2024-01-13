import { OfficerToDistrict, OfficerToWard } from '../models/requets/admin.requests';
import { myDataSource } from '../orm/connectDb';
import { AdvertisingType } from '../orm/entities/AdvertisingType';
import { District } from '../orm/entities/District';
import { DistrictOfficier } from '../orm/entities/DistrictOfficier';
import { ModificationRequest } from '../orm/entities/ModificationRequest';
import { ReportForm } from '../orm/entities/ReportForm';
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
  private advertisingTypeRepository = myDataSource.getRepository(AdvertisingType);
  private reportFormRepository = myDataSource.getRepository(ReportForm);

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

  public async approveModificationRequest(id: number) {
    const modificationRequest = await this.modificationRequestRepository.findOneBy({ id });
    if (modificationRequest) {
      modificationRequest.status = 1;
      this.modificationRequestRepository.save(modificationRequest);
    }
  }

  public async getListAdsBoardType() {
    const listAdsBoardType = this.advertisingTypeRepository.find();
    return listAdsBoardType;
  }

  public async getAdsBoardTypeById(id: number) {
    const adsBoardType = await this.advertisingTypeRepository.findOneBy({ id });
    return adsBoardType;
  }

  public async createAdsBoardType(name: string) {
    const adsBoardType = new AdvertisingType();
    adsBoardType.name = name;
    return await this.advertisingTypeRepository.save(adsBoardType);
  }

  public async updateAdsBoardType(id: number, name: string) {
    console.log(id, name);
    const adsBoardType = await this.advertisingTypeRepository.findOneBy({ id });
    adsBoardType.name = name;
    return await this.advertisingTypeRepository.save(adsBoardType);
  }

  public async deleteAdsBoardType(id: number) {
    return await this.advertisingTypeRepository.delete({ id });
  }

  public async getListReportForm() {
    const listAdsBoardType = this.reportFormRepository.find();
    return listAdsBoardType;
  }

  public async getReportFormById(id: number) {
    const adsBoardType = await this.reportFormRepository.findOneBy({ id });
    return adsBoardType;
  }

  public async createReportForm(name: string) {
    const adsBoardType = new AdvertisingType();
    adsBoardType.name = name;
    return await this.reportFormRepository.save(adsBoardType);
  }

  public async updateReportForm(id: number, name: string) {
    console.log(id, name);
    const adsBoardType = await this.reportFormRepository.findOneBy({ id });
    adsBoardType.name = name;
    return await this.reportFormRepository.save(adsBoardType);
  }

  public async deleteReportForm(id: number) {
    return await this.advertisingTypeRepository.delete({ id });
  }
}

export default new AdminService();
