jest.mock('./api', () => ({
  GetUsers: jest.fn(),
  PostUser: jest.fn()
}));

import * as api from './api';
const mockGetUsers = api.GetUsers;
const mockPostUser = api.PostUser;


import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import Register from './components/Register';
import { BrowserRouter } from "react-router-dom";


/**
 * @function App
 */

//verifie l'affichage de la page d'accueil
describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUsers.mockResolvedValue({ users: [], countUsers: 0 });
    mockPostUser.mockResolvedValue({ id: 1 });
  });
  it('affiche la page d\'accueil par défaut', () => {
    render(<App />);
    expect(screen.getByText(/Bienvenue sur votre annuaire/i)).toBeInTheDocument();
  });

  it('affiche la navigation entre Accueil et Inscription', async () => {
    render(<App />);
    
    // Clic sur "S'inscrire"
    const registerLink = screen.getByRole('link', { name: /Nouvelle inscription/i });
    fireEvent.click(registerLink);
    expect(screen.getByText(/Ajouter un nouvel utilisateur/i)).toBeInTheDocument();
  });

});


//test les ajouts utilisateurs

describe('App - addUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUsers.mockResolvedValue({ users: [], countUsers: 0 });
    mockPostUser.mockResolvedValue({ id: 1 });
  });
  it('ajoute un utilisateur via le formulaire et met à jour le compteur', async () => {
    render(<App />);

    await waitFor(() => screen.getByText(/Ajouter un nouvel utilisateur/i));
    
    // Remplit formulaire (vrai flux utilisateur)
    const prenomInput = screen.getByLabelText(/Prénom/i);
    const nomInput = screen.getByLabelText(/Nom de famille/i);
    const dateInput = screen.getByLabelText(/Date de naissance/i);
    const email = screen.getByLabelText(/Email/i);
    const ville = screen.getByLabelText(/Ville/i);
    const codePostal = screen.getByLabelText(/Code postal/i);
    
    fireEvent.change(prenomInput, { target: { value: 'Marie' } });
    fireEvent.change(nomInput, { target: { value: 'Martin' } });
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } });
    fireEvent.change(email, { target: { value: 'test@test.fr' } });
    fireEvent.change(ville, { target: { value: 'Angers' } });
    fireEvent.change(codePostal, { target: { value: '12345' } });
    
    // Soumet (simule `addUser`)
    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));
    
    // Vérifie redirection + compteur +1
    await waitFor(() => {
      expect(api.GetUsers).toHaveBeenCalled();
    }, { timeout: 3000 });
    


  });

  it('navigue vers Home après soumission réussie (2s)', async () => {
    render(<App />);
    
    const registerLink = screen.getByRole('link', { name: /nouvelle inscription/i });
    await userEvent.click(registerLink);
    await waitFor(() => expect(screen.getByText(/Ajouter un nouvel utilisateur/i)).toBeInTheDocument());
        
    // Remplit formulaire COMPLET
    await userEvent.type(screen.getByLabelText(/Prénom/i), 'Marie');
    await userEvent.type(screen.getByLabelText(/Nom de famille/i), 'Martin');
    await userEvent.type(screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    await userEvent.type(screen.getByLabelText(/Email/i), 'marie@test.fr');
    await userEvent.type(screen.getByLabelText(/Ville/i), 'Angers');
    await userEvent.type(screen.getByLabelText(/Code postal/i), '49100');
    
    // déclenche handleSubmitSuccess
    await userEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));
    
    // Attend TOAST (1s)
    await waitFor(() => {
      expect(screen.getByText(/Inscription réussie/i)).toBeInTheDocument();
    });
    
    // Attend 4s
    await waitFor(() => {
      expect(screen.getByText(/Bienvenue sur votre annuaire/i)).toBeInTheDocument();
    }, { timeout: 4000 });
    

  });
});


describe('App - setUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUsers.mockResolvedValue({ users: [], countUsers: 0 });
    mockPostUser.mockResolvedValue({ id: 1 });
  });
  it('setUsers incrémente le compteur après ajout', async () => {
  // Mock avec 1 utilisateur déjà présent
  mockGetUsers.mockResolvedValue({ users: [{ name: 'Marie', id: 1 }], countUsers: 1 });
  
  render(<App />);
  
  // Clique sur Register
  await userEvent.click(screen.getByRole('link', { name: /nouvelle inscription/i }));
  
  // Remplit formulaire
  await userEvent.type(screen.getByLabelText(/Prénom/i), 'Jean');
  await userEvent.type(screen.getByLabelText(/Nom de famille/i), 'Dupont');
  await userEvent.type(screen.getByLabelText(/Date de naissance/i), '1990-01-01');
  await userEvent.type(screen.getByLabelText(/Email/i), 'jean@test.fr');
  await userEvent.type(screen.getByLabelText(/Ville/i), 'Paris');
  await userEvent.type(screen.getByLabelText(/Code postal/i), '75000');
  
  // Soumet
  await userEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));
  
  // Attend toast + retour Home avec compteur
  await waitFor(() => {
    expect(screen.getByText(/Inscription réussie/i)).toBeInTheDocument();
  });
  
  // Vérifie retour Home avec 2 utilisateurs
  await waitFor(() => {
    expect(screen.getByText(/Bienvenue sur votre annuaire/i)).toBeInTheDocument();
  }, { timeout: 4000 });
});

});


/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByRole("link");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent("Learn React");
});

test('renders code app', () => {
  render(<App />);
  const codeElement = screen.getByTestId("code-app");
  expect(codeElement).toBeInTheDocument();
  expect(codeElement).toHaveTextContent("src/App.js");
});

test('check counter on click me button', () => {
  render(<App />);
  const button = screen.getByRole('button');
  const counter = screen.getByTestId('count')
  expect(button).toBeInTheDocument();
  expect(counter).toBeInTheDocument();
  expect(counter).toHaveTextContent("0");
  fireEvent.click(button);
  expect(counter).toHaveTextContent("1");
});
*/
