import { NextFunction, Request, Response } from 'express';
import { ModificationReqBody } from '../models/requets/modification.request';
import { ApiResponse } from '../models/responses/base.response';
import modificationServices from '../services/modifications.services';
import usersServices from '../services/users.services';
import locationsServices from '../services/locations.services';
import { myDataSource } from '../orm/connectDb';
import { Ward } from '../orm/entities/Ward';
import { AdvertisingLocation } from '../orm/entities/AdvertisingLocation';
import { Like } from 'typeorm';
import { District } from '../orm/entities/District';

export const createModificationRequestcontroller = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.decodedAuthorization.userId;
    const modificationRequest = req.body as ModificationReqBody;
    const { locationId } = modificationRequest;

    if (locationId) {
      const wardOfficer = await usersServices.getWardOfficerByUserId(parseInt(userId, 10));
      const wardId = wardOfficer.manageWardId;
      const location = await locationsServices.getLocationByWardIdAndLocationId(wardId, locationId);

      if (location.length == 0) {
        res.json(ApiResponse.error('location khong thuoc phuong quan ly'));
        return;
      }
    }

    if (
      !locationId &&
      modificationRequest.location &&
      modificationRequest.location.lat &&
      modificationRequest.location.long
    ) {
      const { districtName, wardName } = modificationRequest.location;
      const wardOfficer = await usersServices.getWardOfficerByUserId(parseInt(userId, 10));
      const wardId = wardOfficer.manageWardId;
      const district = await myDataSource
        .getRepository(District)
        .findOne({ where: { name: Like(`%${districtName}%`) } });

      if (!district) {
        throw new Error('District not found');
      }

      const ward = await myDataSource.getRepository(Ward).findOne({
        where: {
          district: { id: district.id },
          name: Like(`%${wardName}%`)
        }
      });

      if (!ward || ward.id != wardId) {
        throw new Error('khong tim thay phuong hoac phuong khong thuoc quan ly');
      }

      const newLocation = myDataSource.getRepository(AdvertisingLocation).create({
        lat: modificationRequest.location.lat,
        long: modificationRequest.location.long,
        address: modificationRequest.location.address,
        wardId: ward.id
      });

      const savedLocation = await myDataSource.getRepository(AdvertisingLocation).save(newLocation);
      modificationRequest.locationId = savedLocation.id;
    }

    const result = await modificationServices.createModificationRequest(modificationRequest);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
