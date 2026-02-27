"use strict";

var _axios = _interopRequireDefault(require("axios"));
var _api = require("./api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
jest.mock('axios');
describe('API functions - 100% Coverage réel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('GetUsers', () => {
    it('Succès : {users, countUsers = users.length}', async () => {
      const mockUsers = [{
        id: 1,
        name: 'John Doe',
        email: 'john@test.com'
      }, {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@test.com'
      }];

      // Mock axios.get → response.data
      _axios.default.get.mockResolvedValue({
        data: mockUsers
      });
      const result = await (0, _api.GetUsers)();
      expect(_axios.default.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      expect(result.users).toEqual(mockUsers);
      expect(result.countUsers).toBe(2);
    });
    it('Erreur HTTP : catch + console.error + throw', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const axiosError = {
        response: {
          status: 500,
          data: {
            message: 'Serveur KO'
          }
        }
      };
      _axios.default.get.mockRejectedValue(axiosError);
      await expect((0, _api.GetUsers)()).rejects.toBe(axiosError);
      expect(consoleSpy).toHaveBeenCalledWith(axiosError);
      expect(_axios.default.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      consoleSpy.mockRestore();
    });
    it('Erreur réseau : propage vers Home.js', async () => {
      const networkError = {
        code: 'ERR_NETWORK',
        message: 'No internet'
      };
      _axios.default.get.mockRejectedValue(networkError);
      await expect((0, _api.GetUsers)()).rejects.toEqual(networkError);
    });
    it('Liste vide : countUsers = 0', async () => {
      _axios.default.get.mockResolvedValue({
        data: []
      });
      const result = await (0, _api.GetUsers)();
      expect(result.users).toEqual([]);
      expect(result.countUsers).toBe(0);
    });
  });
  describe('PostUser', () => {
    it('Erreur 400 : propage vers Register.js', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const validationError = {
        response: {
          status: 400,
          data: {
            message: 'Email invalide ou déjà utilisé'
          }
        }
      };
      _axios.default.post.mockRejectedValue(validationError);
      await expect((0, _api.PostUser)({
        email: 'bad'
      })).rejects.toBe(validationError);
      expect(consoleSpy).toHaveBeenCalledWith(validationError);
      consoleSpy.mockRestore();
    });
    it('Erreur 500 : console.error + throw', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const serverError = {
        response: {
          status: 500
        }
      };
      _axios.default.post.mockRejectedValue(serverError);
      await expect((0, _api.PostUser)({})).rejects.toBe(serverError);
      expect(consoleSpy).toHaveBeenCalledWith(serverError);
      consoleSpy.mockRestore();
    });
    it('Payload vide OK', async () => {
      const emptyPayload = {};
      const mockResponse = {
        id: 999
      };
      _axios.default.post.mockResolvedValue({
        data: mockResponse
      });
      const result = await (0, _api.PostUser)(emptyPayload);
      expect(result.id).toBe(999);
    });
  });
});