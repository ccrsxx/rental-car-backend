import { ApplicationError } from '../../libs/error.js';
import { uploadCloudinary } from '../middlewares/upload.js';
import * as carService from '../services/car.js';
import * as Types from '../../libs/types/common.js';

/**
 * @type {Types.AuthorizedController}
 * @returns {Promise<void>}
 */
export async function getCars(_req, res) {
  try {
    const cars = await carService.getCars();

    res.status(200).json({ data: cars });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * @type {Types.AuthorizedControllerWithCar}
 * @returns {Promise<void>}
 */
export async function getCar(req, res) {
  const { id } = req.params;

  try {
    const car = await carService.getCar(id);

    res.status(200).json({ data: car });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * @type {Types.AuthorizedController<typeof uploadCloudinary>}
 * @returns {Promise<void>}
 */
export async function createCar(req, res) {
  const { body } = req;

  const { id: userId, image: userImage } = res.locals.user;

  const image = res.locals.image ?? userImage;

  try {
    const bodyWithImage = { ...body, image: image };

    const car = await carService.createCar(bodyWithImage, userId);

    res.status(201).json({ message: 'Car created successfully', data: car });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * @type {Types.AuthorizedControllerWithCar}
 * @returns {Promise<void>}
 */
export async function updateCar(req, res) {
  const { body } = req;
  const { id } = req.params;

  const userId = res.locals.user.id;

  try {
    const car = await carService.updateCar(id, body, userId);

    res.status(200).json({ message: 'Car updated successfully', data: car });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * @type {Types.AuthorizedControllerWithCar}
 * @returns {Promise<void>}
 */
export async function destroyCar(req, res) {
  const { id } = req.params;

  const userId = res.locals.user.id;

  try {
    const car = await carService.destroyCar(id, userId);

    res.status(200).json({ message: 'Car deleted successfully', data: car });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * @type {Types.AuthorizedController}
 * @returns {Promise<void>}
 */
export async function resetCar(_req, res) {
  try {
    await carService.resetCar();

    res.status(200).json({ message: 'Car reset successfully' });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}
