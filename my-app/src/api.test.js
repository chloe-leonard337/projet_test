jest.mock('axios');

import axios from 'axios';
import { GetUsers, PostUser } from './api';

describe('API functions - 100% Coverage réel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GetUsers', () => {
    it('Succès : {users, countUsers = users.length}', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@test.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@test.com' }
      ];
      
      // Mock axios.get → response.data
      axios.get.mockResolvedValue({ data: mockUsers });

      const result = await GetUsers();

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/users');
      expect(result.users).toEqual(mockUsers);
      expect(result.countUsers).toBe(2); 
    });

    it('Erreur HTTP : catch + console.error + throw', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const axiosError = {
        response: { status: 500, data: { message: 'Serveur KO' } }
      };

      axios.get.mockRejectedValue(axiosError);

      await expect(GetUsers()).rejects.toBe(axiosError);
      expect(consoleSpy).toHaveBeenCalledWith(axiosError); 
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/users');
      consoleSpy.mockRestore();
    });

    it('Erreur réseau : propage vers Home.js', async () => {
      const networkError = { code: 'ERR_NETWORK', message: 'No internet' };
      axios.get.mockRejectedValue(networkError);

      await expect(GetUsers()).rejects.toEqual(networkError);
    });

    it('Liste vide : countUsers = 0', async () => {
      axios.get.mockResolvedValue({ data: [] });

      const result = await GetUsers();
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
          data: { message: 'Email invalide ou déjà utilisé' }
        }
      };

      axios.post.mockRejectedValue(validationError);

      await expect(PostUser({ email: 'bad' })).rejects.toBe(validationError);
      expect(consoleSpy).toHaveBeenCalledWith(validationError);
      consoleSpy.mockRestore();
    });

    it('Erreur 500 : console.error + throw', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const serverError = { response: { status: 500 } };

      axios.post.mockRejectedValue(serverError);

      await expect(PostUser({})).rejects.toBe(serverError);
      expect(consoleSpy).toHaveBeenCalledWith(serverError);
      consoleSpy.mockRestore();
    });

    it('Payload vide OK', async () => {
      const emptyPayload = {};
      const mockResponse = { id: 999 };

      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await PostUser(emptyPayload);
      expect(result.id).toBe(999);
    });
  });
});
