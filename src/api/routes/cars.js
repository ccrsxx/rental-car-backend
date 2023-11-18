import { Router } from 'express';
import * as authMiddleware from '../middlewares/auth.js';
import * as uploadMiddleware from '../middlewares/upload.js';
import * as carController from '../controllers/car.js';
import * as validationMiddleware from '../middlewares/validation.js';
import * as Types from '../../libs/types/common.js';

/**
 * @type {Types.Route}
 * @returns {void}
 */
export default (app) => {
  const router = Router();

  app.use('/cars', router);

  router.get('/', authMiddleware.isAuthorized, carController.getCars);

  router.get(
    '/:id',
    authMiddleware.isAuthorized,
    validationMiddleware.isCarExists,
    carController.getCar
  );

  router.post(
    '/',
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    uploadMiddleware.parseImage,
    uploadMiddleware.uploadCloudinary,
    carController.createCar
  );

  router.put(
    '/:id',
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    validationMiddleware.isCarExists,
    carController.updateCar
  );

  router.delete(
    '/:id',
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    validationMiddleware.isCarExists,
    carController.destroyCar
  );

  router.post(
    '/reset',
    authMiddleware.isAuthorized,
    authMiddleware.isSuperAdmin,
    carController.resetCar
  );
};
