import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';
import * as api from '../api';

jest.mock('../api');
const mockPostUser = api.PostUser;

const fillForm = async () => {
  await fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: 'Marie' } });
  await fireEvent.change(screen.getByLabelText(/Nom de famille/i), { target: { value: 'Martin' } });
  await fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'marie@test.fr' } });
  await fireEvent.change(screen.getByLabelText(/Date de naissance/i), { target: { value: '1990-01-01' } });
  await fireEvent.change(screen.getByLabelText(/Ville/i), { target: { value: 'Paris' } });
  await fireEvent.change(screen.getByLabelText(/Code postal/i), { target: { value: '75000' } });
};

const testErrorCase = async (error, expectedMessage) => {
  mockPostUser.mockRejectedValueOnce(error);
  
  render(<MemoryRouter><Register /></MemoryRouter>);
  await fillForm();
  fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

  await waitFor(() => {
    const errorAlert = screen.getAllByText(new RegExp(expectedMessage))[0];
    expect(errorAlert).toBeInTheDocument();
  });
};

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('affiche formulaire avec tous les champs', () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    
    expect(screen.getByLabelText(/Prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom de famille/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de naissance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Code postal/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
  });

  it('désactive bouton si formulaire vide', () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeDisabled();
  });

  it('active bouton après remplissage formulaire', async () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    await fillForm();
    expect(screen.getByRole('button', { name: /S'inscrire/i })).not.toBeDisabled();
  });

  it('soumet données correctes via PostUser', async () => {
    const mockResponse = { id: 1, firstName: 'Marie', lastName: 'Martin', email: 'marie@test.fr' };
    mockPostUser.mockResolvedValue(mockResponse);
    
    render(<MemoryRouter><Register /></MemoryRouter>);
    await fillForm();
    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(mockPostUser).toHaveBeenCalledWith({
        firstName: 'Marie',
        lastName: 'Martin',
        email: 'marie@test.fr',
        dob: '1990-01-01',
        city: 'Paris',
        postalCode: '75000'
      });
    });
  });

  describe('Error Handling', () => {
    it('affiche erreur HTTP 400', async () => {
      await testErrorCase(
        { response: { status: 400, data: { message: 'Email invalide ou déjà utilisé' } } },
        'Email invalide ou déjà utilisé'
      );
    });

    it('affiche erreur HTTP 500', async () => {
      await testErrorCase(
        { response: { status: 500 } },
        'Erreur serveur, veuillez réessayez plus tard'
      );
    });

    it('affiche erreur réseau ERR_NETWORK', async () => {
      await testErrorCase(
        { code: 'ERR_NETWORK' },
        'Problème de connexion. Vérifiez votre réseau'
      );
    });

    it('utilise message erreur custom (err.message)', async () => {
      await testErrorCase(
        new Error('Erreur personnalisée'),
        'Erreur personnalisée'
      );
    });

    it('console.error est appelé', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockPostUser.mockRejectedValueOnce(new Error('Une erreur est survenue'));
      
      render(<MemoryRouter><Register /></MemoryRouter>);
      await fillForm();
      fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
