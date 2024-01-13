import { ModificationReqBody } from '../models/requets/modification.request';
import { myDataSource } from '../orm/connectDb';
import { LicenseRequest } from '../orm/entities/LicenseRequest';
import { ModificationRequest } from '../orm/entities/ModificationRequest';

class ModificationService {
  private modificationRepository = myDataSource.getRepository(ModificationRequest);

  public async createModificationRequest(modificationRequest: ModificationReqBody) {
    console.log('🚀 ~ ModificationService ~ createModificationRequest ~ modificationRequest:', modificationRequest);
    const newModification = this.modificationRepository.create({
      ...modificationRequest,
      ...modificationRequest.location,
      newLocationId: modificationRequest.locationId,
      boardId: modificationRequest.advertisingBoardId,
      requestTime: new Date(),
    });
    // modification_request = { ...modificationRequest, status: 0 };
    return await this.modificationRepository.save(newModification);
  }
}

export default new ModificationService();
