import { Car, User } from '../models/index.js';
import * as Models from '../models/car.js';
import { generateRandomCar } from '../../libs/seed.js';

export function getCars() {
  return Car.findAll({
    attributes: {
      exclude: ['createdBy', 'updatedBy', 'deletedBy']
    }
  });
}

/** @param {string} id */
export function getCar(id) {
  return Car.findByPk(id, {
    include: [
      {
        model: User,
        as: 'createdByUser',
        attributes: {
          exclude: ['password']
        }
      },
      {
        model: User,
        as: 'updatedByUser',
        attributes: {
          exclude: ['password']
        }
      },
      {
        model: User,
        as: 'deletedByUser',
        attributes: {
          exclude: ['password']
        }
      }
    ],
    attributes: {
      exclude: ['createdBy', 'updatedBy', 'deletedBy']
    }
  });
}

/** @param {Models.CarAttributes} payload */
export function createCar(payload) {
  return Car.create(payload);
}

/**
 * @param {string} id
 * @param {Partial<Models.CarAttributes>} payload
 */
export function updateCar(id, payload) {
  return Car.update(payload, {
    where: { id },
    returning: true
  });
}

/**
 * @param {string} id
 * @param {string} userId
 */
export async function destroyCar(id, userId) {
  await Car.destroy({ where: { id } });
  return Car.update(
    { deletedBy: userId },
    { where: { id }, returning: true, paranoid: false }
  );
}

export async function resetCar() {
  await Car.destroy({ truncate: true });
  await Car.bulkCreate(
    /** @type {Models.CarAttributes[]} */ (await generateRandomCar())
  );
}
