import {
  ApplicationError,
  generateApplicationError
} from '../../libs/error.js';
import * as carRepository from '../repositories/car.js';
import * as Models from '../models/car.js';
import { omitPropertiesFromObject } from '../../libs/utils.js';

export async function getCars() {
  try {
    const cars = await carRepository.getCars();
    return cars;
  } catch (err) {
    throw generateApplicationError(err, 'Error while getting cars', 500);
  }
}

/** @param {string} id */
export async function getCar(id) {
  try {
    const car = await carRepository.getCar(id);

    if (!car) {
      throw new ApplicationError('Car not found', 404);
    }

    return car;
  } catch (err) {
    throw generateApplicationError(err, 'Error while getting car', 500);
  }
}

/**
 * @param {Models.CarAttributes} payload
 * @param {string} userId
 */
export async function createCar(payload, userId) {
  const parsedPayload = omitPropertiesFromObject(payload, [
    'id',
    'createdBy',
    'updatedBy',
    'deletedBy',
    'createdAt',
    'updatedAt',
    'deletedAt'
  ]);

  const parsedPayloadWithCreatedBy = /** @type {Models.CarAttributes} */ ({
    ...parsedPayload,
    createdBy: userId
  });

  try {
    const car = await carRepository.createCar(parsedPayloadWithCreatedBy);
    return car;
  } catch (err) {
    throw generateApplicationError(err, 'Error while creating car', 500);
  }
}

/**
 * @param {string} id
 * @param {Partial<Models.CarAttributes>} payload
 * @param {string} userId
 */
export async function updateCar(id, payload, userId) {
  const parsedPayload = omitPropertiesFromObject(payload, [
    'id',
    'createdBy',
    'updatedBy',
    'deletedBy',
    'createdAt',
    'updatedAt',
    'deletedAt'
  ]);

  /** @type {Partial<Models.CarAttributes>} */
  const parsedPayloadWithUpdatedBy = {
    ...parsedPayload,
    updatedBy: userId
  };

  try {
    const [, [car]] = await carRepository.updateCar(
      id,
      parsedPayloadWithUpdatedBy
    );

    return car;
  } catch (err) {
    throw generateApplicationError(err, 'Error while updating car', 500);
  }
}

/**
 * @param {string} id
 * @param {string} userId
 */
export async function destroyCar(id, userId) {
  try {
    const [, [car]] = await carRepository.destroyCar(id, userId);
    return car;
  } catch (err) {
    throw generateApplicationError(err, 'Error while deleting car', 500);
  }
}

export async function resetCar() {
  try {
    await carRepository.resetCar();
  } catch (err) {
    throw generateApplicationError(err, 'Error while resetting car', 500);
  }
}
