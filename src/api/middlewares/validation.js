import { ApplicationError } from '../../libs/error.js';
import { isAdmin } from './auth.js';
import * as carService from '../services/car.js';
import * as Models from '../models/car.js';
import * as Types from '../../libs/types/common.js';

/**
 * Check if car exists.
 *
 * @type {Types.Middleware<
 *   Types.ExtractLocalsMiddleware<typeof isAdmin> & {
 *     car: Models.CarAttributes;
 *   }
 * >}
 * @returns {Promise<void>}
 */
export async function isCarExists(req, res, next) {
  const { id } = req.params;

  try {
    const car = await carService.getCar(id);
    res.locals.car = car.dataValues;
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  next();
}

/**
 * Check if valid credentials.
 *
 * @type {Types.Middleware}
 * @returns {void}
 */
export function isValidCredential(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ message: 'Email and password must be string' });
    return;
  }

  next();
}
