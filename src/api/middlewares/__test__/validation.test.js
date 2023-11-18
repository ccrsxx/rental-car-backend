import { jest } from '@jest/globals';
import { ApplicationError } from '../../../libs/error.js';

/** @typedef {Record<keyof import('../validation.js'), jest.Mock>} ValidationMiddlewareMock */
/** @typedef {Record<keyof import('../../services/car.js'), jest.Mock>} CarServiceMock */

jest.unstable_mockModule(
  '../../../libs/cloudinary.js',
  () =>
    /** @type {ValidationMiddlewareMock} */
    ({ isCarExists: jest.fn() })
);

jest.unstable_mockModule(
  '../../services/car.js',
  () =>
    /** @type {CarServiceMock} */
    ({
      getCar: jest.fn()
    })
);

const validationMiddleware = /** @type {ValidationMiddlewareMock} */ (
  await import('../validation.js')
);

const carService = /** @type {CarServiceMock} */ (
  await import('../../services/car.js')
);

describe('Validation middleware', () => {
  describe('Is car exists', () => {
    it('passes the middleware and put car data to locals', async () => {
      const mockCar = {
        id: '1',
        name: 'Emilia'
      };

      carService.getCar.mockResolvedValue(
        /** @ts-ignore */
        { dataValues: mockCar }
      );

      const mockRequest = {
        params: {
          id: '1'
        }
      };

      const mockResponse = {
        locals: {},
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNext = jest.fn();

      await validationMiddleware.isCarExists(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.locals).toEqual({ car: mockCar });
      expect(mockNext).toHaveBeenCalledTimes(1);
    });

    it('returns 404 when car is not found', async () => {
      const mockError = new ApplicationError('Car not found', 404);

      carService.getCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {
        params: {
          id: '1'
        }
      };

      const mockResponse = {
        locals: {},
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNext = jest.fn();

      await validationMiddleware.isCarExists(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.locals).toEqual({});

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Car not found'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('throws generic error when car service fails', async () => {
      const mockError = new Error('Internal server error');

      carService.getCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {
        params: {
          id: '1'
        }
      };

      const mockResponse = {
        locals: {},
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNext = jest.fn();

      await validationMiddleware.isCarExists(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.locals).toEqual({});

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Is valid credential', () => {
    it('passes the middleware', async () => {
      const mockRequest = {
        body: {
          email: 'Emilia',
          password: 'Best girl'
        }
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNext = jest.fn();

      validationMiddleware.isValidCredential(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledTimes(1);
    });

    it('returns 400 when email and password are not provided', async () => {
      const mockRequest = {
        body: {}
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNext = jest.fn();

      validationMiddleware.isValidCredential(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Email and password are required'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('returns 400 when email and password are not string', async () => {
      const mockRequest = {
        body: {
          email: 1,
          password: 1
        }
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNext = jest.fn();

      validationMiddleware.isValidCredential(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Email and password must be string'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
