import { jest } from '@jest/globals';
import * as indexController from '../index.js';

describe('Index controller', () => {
  describe('Welcome message', () => {
    it('should return 200 status code with message and documentation link', () => {
      const mockRequest = {};

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // @ts-ignore
      indexController.ping(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Ping successfully',
        documentation: 'https://dev.risalamin.com/docs'
      });
    });
  });
});
