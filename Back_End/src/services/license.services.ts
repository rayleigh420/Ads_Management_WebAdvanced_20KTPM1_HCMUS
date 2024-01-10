import { myDataSource } from '../orm/connectDb';
import { LicenseRequest } from '../orm/entities/LicenseRequest';

class LicenseService {
  private licenseRepository = myDataSource.getRepository(LicenseRequest);

  public async getListLicense() {
    return await this.licenseRepository.find();
  }

  public async createLicenseRequest(licenseRequest) {
    let license_request = new LicenseRequest();
    license_request = { ...licenseRequest, status: 0 };
    console.log(license_request);
    return await this.licenseRepository.save(license_request);
  }

  public async approveLicense(id: number) {
    const license = await this.licenseRepository.findOneBy({ id });
    if (license) {
      license.status = 1;
      this.licenseRepository.save(license);
    }
  }

  public async deleteLicense(id: number) {
    return await this.licenseRepository.delete({ id });
  }
}

export default new LicenseService();
