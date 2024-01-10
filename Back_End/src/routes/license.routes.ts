import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { createLicenseRequest, deleteLicense, getListLicenseRequest } from '../controllers/licenses.controllers';
import { createLicenseRequestValidator } from '../middlewares/license.middlewares';
import { authorizationOfficerValidator, authorizationWardOfficerValidator } from '../middlewares/admin.middlewares';

const licenseRouter = Router();

// licenseRouter.use(authorizationWardOfficerValidator);

licenseRouter.get('/', authorizationOfficerValidator, wrapRequestHandler(getListLicenseRequest));
licenseRouter.post(
  '/',
  authorizationWardOfficerValidator,
  createLicenseRequestValidator,
  wrapRequestHandler(createLicenseRequest)
);
licenseRouter.delete('/:id', authorizationWardOfficerValidator, wrapRequestHandler(deleteLicense));

export default licenseRouter;
