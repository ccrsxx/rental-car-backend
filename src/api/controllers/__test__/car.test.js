import { jest } from '@jest/globals';
import { ApplicationError } from '../../../libs/error.js';

/** @typedef {Record<keyof import('../../services/car.js'), jest.Mock>} CarControllerMock */
/** @typedef {Record<keyof import('../../services/car.js'), jest.Mock>} CarServiceMock */

jest.unstable_mockModule(
  '../../services/car.js',
  () =>
    /** @type {CarServiceMock} */
    ({
      getCars: jest.fn(),
      getCar: jest.fn(),
      createCar: jest.fn(),
      updateCar: jest.fn(),
      destroyCar: jest.fn(),
      resetCar: jest.fn()
    })
);

const carController = /** @type {CarControllerMock} */ (
  await import('../car.js')
);

const carService = /** @type {CarServiceMock} */ (
  await import('../../services/car.js')
);

describe('Car controller', () => {
  describe('Get cars', () => {
    it('returns list of cars', async () => {
      const mockCars = [
        {
          id: '1',
          name: 'Toyota'
        },
        {
          id: '2',
          name: 'Honda'
        },
        {
          id: '3',
          name: 'BMW'
        }
      ];

      carService.getCars.mockResolvedValue(
        // @ts-ignore
        mockCars
      );

      const mockRequest = {};

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // @ts-ignore
      await carController.getCars(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockCars });
    });

    it('throws application error when getCars fails', async () => {
      const mockError = new ApplicationError('Failed to get cars', 500);

      carService.getCars.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {};

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // @ts-ignore
      await carController.getCars(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(mockError.statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message
      });
    });

    it('throws generic error when getCars fails', async () => {
      const mockError = new Error();

      carService.getCars.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {};

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // @ts-ignore
      await carController.getCars(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error'
      });
    });
  });

  describe('Get car', () => {
    it('gets a car', async () => {
      const mockCar = {
        id: '1',
        name: 'Toyota'
      };

      carService.getCar.mockResolvedValue(
        // @ts-ignore
        mockCar
      );

      const mockRequest = {
        params: { id: mockCar.id }
      };

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // @ts-ignore
      await carController.getCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockCar
      });
    });

    it('throws application error when getCar fails', async () => {
      const mockError = new ApplicationError('Failed to get car', 500);

      carService.getCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {
        params: {
          id: 1
        }
      };

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.getCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(mockError.statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message
      });
    });

    it('throws generic error when getCar fails', async () => {
      const mockError = new Error();

      carService.getCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {
        params: {
          id: 1
        }
      };

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.getCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error'
      });
    });
  });

  describe('Create car', () => {
    it('creates a car', async () => {
      const mockCar = {
        id: '1',
        name: 'Toyota'
      };

      carService.createCar.mockResolvedValue(
        // @ts-ignore
        mockCar
      );

      const mockRequest = {
        body: mockCar
      };

      const mockResponse = {
        locals: { user: {} },
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // @ts-ignore
      await carController.createCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Car created successfully',
        data: mockCar
      });
    });

    it('throws application error when createCar fails', async () => {
      const mockError = new ApplicationError('Failed to create car', 500);

      carService.createCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {};

      const mockResponse = {
        locals: { user: {} },
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.createCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(mockError.statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message
      });
    });

    it('throws generic error when createCar fails', async () => {
      const mockError = new Error();

      carService.createCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {};

      const mockResponse = {
        locals: { user: {} },
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.createCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error'
      });
    });
  });

  describe('Update car', () => {
    it('updates a car', async () => {
      const mockCar = {
        id: '1',
        name: 'Toyota'
      };

      carService.updateCar.mockResolvedValue(
        // @ts-ignore
        mockCar
      );

      const mockRequest = {
        body: mockCar,
        params: { id: mockCar.id }
      };

      const mockResponse = {
        locals: { user: {} },
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // @ts-ignore
      await carController.updateCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Car updated successfully',
        data: mockCar
      });
    });

    it('throws application error when updateCar fails', async () => {
      const mockError = new ApplicationError('Failed to update car', 500);

      carService.updateCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {
        params: {
          id: 1
        }
      };

      const mockResponse = {
        locals: { user: {} },
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.updateCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(mockError.statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message
      });
    });

    it('throws generic error when updateCar fails', async () => {
      const mockError = new Error();

      carService.updateCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {
        params: {
          id: 1
        }
      };

      const mockResponse = {
        locals: { user: {} },
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.updateCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error'
      });
    });
  });

  describe('Destroy car', () => {
    it('destroys a car', async () => {
      const mockCar = {
        id: '1',
        name: 'Toyota'
      };

      carService.destroyCar.mockResolvedValue(
        // @ts-ignore
        mockCar
      );

      const mockRequest = {
        params: { id: mockCar.id }
      };

      const mockResponse = {
        locals: { user: {} },
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // @ts-ignore
      await carController.destroyCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Car deleted successfully',
        data: mockCar
      });
    });

    it('throws application error when destroyCar fails', async () => {
      const mockError = new ApplicationError('Failed to destroy car', 500);

      carService.destroyCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {
        params: {
          id: 1
        }
      };

      const mockResponse = {
        locals: { user: {} },
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.destroyCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(mockError.statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message
      });
    });

    it('throws generic error when destroyCar fails', async () => {
      const mockError = new Error();

      carService.destroyCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {
        params: {
          id: 1
        }
      };

      const mockResponse = {
        locals: { user: {} },
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.destroyCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error'
      });
    });
  });

  describe('Reset car', () => {
    it('resets a car', async () => {
      const mockRequest = {};

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // @ts-ignore
      await carController.resetCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Car reset successfully'
      });
    });

    it('throws application error when resetCar fails', async () => {
      const mockError = new ApplicationError('Failed to reset car', 500);

      carService.resetCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {};

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.resetCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(mockError.statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message
      });
    });

    it('throws generic error when resetCar fails', async () => {
      const mockError = new Error();

      carService.resetCar.mockRejectedValue(
        // @ts-ignore
        mockError
      );

      const mockRequest = {};

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await carController.resetCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error'
      });
    });
  });
});

// /**
//  * Creates an error for application error and generic error tests
//  *
//  * @param {string} errorMessage
//  * @param {number} errorStatusCode
//  * @param {keyof CarServiceMock} mockError
//  */
// function createErrorTest(errorMessage, errorStatusCode, mockError) {
//   it(`throws application error when ${mockError} fails`, async () => {
//     carService[mockError].mockRejectedValue(
//       // @ts-ignore
//       mockError
//     );

//     const mockRequest = {};

//     const mockResponse = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis()
//     };

//     // @ts-ignore
//     await carController[mockError.name](mockRequest, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(errorStatusCode);
//     expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
//   });
// }
