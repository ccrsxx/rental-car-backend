import { jest } from '@jest/globals';
import { ApplicationError } from '../../../libs/error.js';

/** @typedef {Record<keyof import('../../repositories/car.js'), jest.Mock>} CarRepositoryMock */
/** @typedef {Record<keyof import('../car.js'), jest.Mock>} CarServiceMock */

jest.unstable_mockModule(
  '../../repositories/car.js',
  () =>
    /** @type {CarRepositoryMock} */
    ({
      getCars: jest.fn(),
      getCar: jest.fn(),
      createCar: jest.fn(),
      updateCar: jest.fn(),
      destroyCar: jest.fn(),
      resetCar: jest.fn()
    })
);

const carRepository = /** @type {CarRepositoryMock} */ (
  await import('../../repositories/car.js')
);

const carService = /** @type {CarServiceMock} */ (await import('../car.js'));

describe('Car service', () => {
  describe('Get cars', () => {
    it('returns cars data', async () => {
      const mockCars = [
        {
          id: '1',
          name: 'Emilia'
        }
      ];

      carRepository.getCars.mockResolvedValue(
        /** @ts-ignore */
        mockCars
      );

      const cars = await carService.getCars();

      expect(cars).toEqual(mockCars);
    });

    it('throws application error when getting cars fails', async () => {
      const mockError = new ApplicationError('Failed to get cars', 500);

      carRepository.getCars.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(carService.getCars()).rejects.toThrow(
        `Error while getting cars: ${mockError.message}`
      );
    });
  });

  describe('Get car', () => {
    it('returns car data', async () => {
      const mockCar = {
        id: '1',
        name: 'Emilia'
      };

      carRepository.getCar.mockResolvedValue(
        /** @ts-ignore */
        mockCar
      );

      const car = await carService.getCar('1');

      expect(car).toEqual(mockCar);
    });

    it('throws application error when getting car fails', async () => {
      const mockError = new ApplicationError('Failed to get car', 500);

      carRepository.getCar.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(carService.getCar('1')).rejects.toThrow(
        `Error while getting car: ${mockError.message}`
      );
    });

    it('throws application error when car is not found', async () => {
      carRepository.getCar.mockResolvedValue(
        /** @ts-ignore */
        null
      );

      await expect(carService.getCar('1')).rejects.toThrow(
        'Error while getting car: Car not found'
      );
    });

    it('throws application error when getting car fails', async () => {
      const mockError = new ApplicationError('Failed to get car', 500);

      carRepository.getCar.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(carService.getCar('1')).rejects.toThrow(
        `Error while getting car: ${mockError.message}`
      );
    });
  });

  describe('Create car', () => {
    it('returns created car data with the user id that creates', async () => {
      const createdBy = 'Emilia-tan';

      const mockCar = {
        id: '1',
        name: 'Emilia'
      };

      const mockCarWithCreatedBy = {
        ...mockCar,
        createdBy
      };

      carRepository.createCar.mockResolvedValue(
        /** @ts-ignore */
        mockCarWithCreatedBy
      );

      const car = await carService.createCar(mockCar, createdBy);

      expect(car).not.toEqual(mockCar);
      expect(car).toEqual(mockCarWithCreatedBy);
    });

    it('throws application error when creating car fails', async () => {
      const mockError = new ApplicationError('Failed to create car', 500);

      carRepository.createCar.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(carService.createCar({}, '1')).rejects.toThrow(
        `Error while creating car: ${mockError.message}`
      );
    });
  });

  describe('Update car', () => {
    it('returns updated car data with that user id updates it', async () => {
      const updatedBy = 'Emilia-tan';

      const mockCar = {
        id: '1',
        name: 'Emilia'
      };

      const mockCarWithUpdatedBy = {
        ...mockCar,
        updatedBy
      };

      carRepository.updateCar.mockResolvedValue(
        /** @ts-ignore */
        [null, [mockCarWithUpdatedBy]]
      );

      const car = await carService.updateCar('1', mockCar, updatedBy);

      expect(car).toEqual(mockCarWithUpdatedBy);
    });

    it('throws application error when updating car fails', async () => {
      const mockError = new ApplicationError('Failed to update car', 500);

      carRepository.updateCar.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(carService.updateCar('1', {}, '1')).rejects.toThrow(
        `Error while updating car: ${mockError.message}`
      );
    });
  });

  describe('Destroy car', () => {
    it('returns destroyed car data with that user id destroys it', async () => {
      const deletedBy = 'Emilia-tan';

      const mockCar = {
        id: '1',
        name: 'Emilia'
      };

      const mockCarWithDeletedBy = {
        ...mockCar,
        deletedBy
      };

      carRepository.destroyCar.mockResolvedValue(
        /** @ts-ignore */
        [null, [mockCarWithDeletedBy]]
      );

      const car = await carService.destroyCar('1', deletedBy);

      expect(car).toEqual(mockCarWithDeletedBy);
    });

    it('throws application error when destroying car fails', async () => {
      const mockError = new ApplicationError('Failed to destroy car', 500);

      carRepository.destroyCar.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(carService.destroyCar('1', '1')).rejects.toThrow(
        `Error while deleting car: ${mockError.message}`
      );
    });
  });

  describe('Reset car', () => {
    it('resets car', async () => {
      carRepository.resetCar.mockResolvedValue(
        /** @ts-ignore */
        undefined
      );

      await carService.resetCar();

      expect(carRepository.resetCar).toHaveBeenCalledTimes(1);
    });

    it('throws application error when resetting car fails', async () => {
      const mockError = new ApplicationError('Failed to reset car', 500);

      carRepository.resetCar.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(carService.resetCar()).rejects.toThrow(
        `Error while resetting car: ${mockError.message}`
      );
    });
  });
});
