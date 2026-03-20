import axios from 'axios';

const API = 'http://localhost:8000';

export const GetUsers = async () => {
  try {
    const response = await axios.get(`${API}/users`);
    const users = response.data.utilisateurs;
    const countUsers = users.length;

    return { users, countUsers };
  } catch (error) {
    console.error('Erreur GetUsers:', error);
    throw error;
  }
};

export const PostUser = async (payload) => {
  try {
    const response = await axios.post(`${API}/users`, payload);

    return {
      success: true,
      message: response.data.message || 'Inscription réussie',
      user: response.data.user,
    };
  } catch (error) {
    console.error('Erreur PostUser:', error);

    if (error.response?.status === 400) {
      throw new Error(error.response.data.message || 'Email invalide ou déjà utilisé');
    }
    if (error.response?.status === 500) {
      throw new Error('Erreur serveur, veuillez réessayer plus tard.');
    }
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Problème de connexion. Vérifiez votre réseau.');
    }

    throw error;
  }
};
