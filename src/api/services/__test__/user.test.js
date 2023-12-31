import { jest } from '@jest/globals';
import { ApplicationError } from '../../../libs/error.js';

/** @typedef {Record<keyof import('../../repositories/user.js'), jest.Mock>} UserRepositoryMock */
/** @typedef {Record<keyof import('../user.js'), jest.Mock>} UserServiceMock */
/** @typedef {Record<keyof import('../auth.js'), jest.Mock>} AuthServiceMock */

jest.unstable_mockModule(
  '../../repositories/user.js',
  () =>
    /** @type {UserRepositoryMock} */ ({
      getUser: jest.fn(),
      getUserByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      destroyUser: jest.fn(),
      resetUser: jest.fn()
    })
);

jest.unstable_mockModule(
  '../auth.js',
  () =>
    /** @type {AuthServiceMock} */ ({
      hashPassword: jest.fn()
    })
);

const userRepository = /** @type {UserRepositoryMock} */ (
  await import('../../repositories/user.js')
);

const authService = /** @type {AuthServiceMock} */ (await import('../auth.js'));

const userService = /** @type {UserServiceMock} */ (await import('../user.js'));

describe('User service', () => {
  describe('Get user', () => {
    it('returns user data', async () => {
      const mockUser = {
        dataValues: {
          id: '1',
          name: 'Emilia'
        }
      };

      userRepository.getUser.mockResolvedValue(
        /** @ts-ignore */
        mockUser
      );

      const user = await userService.getUser('1');

      expect(user).toEqual(mockUser);
    });

    it('throws application error when user is not found', async () => {
      const mockError = new ApplicationError('User not found', 404);

      userRepository.getUser.mockResolvedValue(
        /** @ts-ignore */
        null
      );

      await expect(userService.getUser('1')).rejects.toThrow(
        `Error while getting user: ${mockError.message}`
      );
    });

    it('throws application error when getting user fails', async () => {
      const mockError = new ApplicationError('Failed to get user', 500);

      userRepository.getUser.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(userService.getUser('1')).rejects.toThrow(
        `Error while getting user: ${mockError.message}`
      );
    });
  });

  describe('Get user by email', () => {
    it('returns user data', async () => {
      const mockUser = {
        dataValues: {
          id: '1',
          name: 'Emilia'
        }
      };

      userRepository.getUserByEmail.mockResolvedValue(
        /** @ts-ignore */
        mockUser
      );

      const user = await userService.getUserByEmail('email');

      expect(user).toEqual(mockUser);
    });

    it('throws application error when user is not found', async () => {
      const mockError = new ApplicationError('User not found', 404);

      userRepository.getUserByEmail.mockResolvedValue(
        /** @ts-ignore */
        null
      );

      await expect(userService.getUserByEmail('email')).rejects.toThrow(
        `Error while getting user: ${mockError.message}`
      );
    });

    it('throws application error when getting user fails', async () => {
      const mockError = new ApplicationError('Failed to get user', 500);

      userRepository.getUserByEmail.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(userService.getUserByEmail('email')).rejects.toThrow(
        `Error while getting user: ${mockError.message}`
      );
    });
  });

  describe('Create user', () => {
    it('returns user data with role admin admin creates it', async () => {
      const mockUser = {
        name: 'Emilia',
        password: 'Emilia'
      };

      const mockHashedPassword = 'Emilia-tan';

      const mockUserWithHashedPasswordAndRole = {
        ...mockUser,
        role: 'admin',
        password: mockHashedPassword
      };

      authService.hashPassword.mockResolvedValue(
        /** @ts-ignore */
        mockHashedPassword
      );

      userRepository.createUser.mockImplementation((payload) => payload);

      const userResult = await userService.createUser(mockUser, true);

      expect(userResult).toEqual(mockUserWithHashedPasswordAndRole);
      expect(userResult).toMatchObject({ role: 'admin' });
    });

    it('returns user data with role member when member creates it', async () => {
      const mockUser = {
        name: 'Emilia',
        password: 'Emilia'
      };

      const mockHashedPassword = 'Emilia-tan';

      const mockUserWithHashedPasswordAndRole = {
        ...mockUser,
        role: 'member',
        password: mockHashedPassword
      };

      authService.hashPassword.mockResolvedValue(
        /** @ts-ignore */
        mockHashedPassword
      );

      userRepository.createUser.mockImplementation((payload) => payload);

      const userResult = await userService.createUser(mockUser, false);

      expect(userResult).toEqual(mockUserWithHashedPasswordAndRole);
      expect(userResult).toMatchObject({ role: 'member' });
    });

    it('throws application error when creating user fails', async () => {
      const mockError = new ApplicationError('Failed to create user', 500);

      userRepository.createUser.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(userService.createUser({}, false)).rejects.toThrow(
        `Error while creating user: ${mockError.message}`
      );
    });
  });

  describe('Update user', () => {
    it('returns user data', async () => {
      const mockUser = {
        id: '1',
        name: 'Emilia'
      };

      userRepository.updateUser.mockImplementation((payload) => payload);

      const userResult = await userService.updateUser(mockUser);

      expect(userResult).toEqual(mockUser);
    });

    it('throws application error when updating user fails', async () => {
      const mockError = new ApplicationError('Failed to update user', 500);

      userRepository.updateUser.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(userService.updateUser({})).rejects.toThrow(
        `Error while updating user: ${mockError.message}`
      );
    });
  });

  describe('Destroy user', () => {
    it('returns user data', async () => {
      const mockUser = {
        id: '1',
        name: 'Emilia'
      };

      userRepository.destroyUser.mockResolvedValue(
        /** @ts-ignore */
        mockUser
      );

      const userResult = await userService.destroyUser(mockUser);

      expect(userResult).toEqual(mockUser);
    });

    it('throws application error when destroying user fails', async () => {
      const mockError = new ApplicationError('Failed to destroy user', 500);

      userRepository.destroyUser.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(userService.destroyUser('1')).rejects.toThrow(
        `Error while deleting user: ${mockError.message}`
      );
    });
  });

  describe('Reset user', () => {
    it('returns user data', async () => {
      userRepository.resetUser.mockImplementation(
        /** @ts-ignore */
        undefined
      );

      await userService.resetUser();

      expect(userRepository.resetUser).toHaveBeenCalled();
    });

    it('throws application error when resetting user fails', async () => {
      const mockError = new ApplicationError('Failed to reset user', 500);

      userRepository.resetUser.mockRejectedValue(
        /** @ts-ignore */
        mockError
      );

      await expect(userService.resetUser({})).rejects.toThrow(
        `Error while resetting user: ${mockError.message}`
      );
    });
  });
});
