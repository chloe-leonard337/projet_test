import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

/**
 * @function App
 */

//verifie l'affichage de la page d'accueil
describe('App', () => {
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
    // Nettoie localStorage AVANT chaque test
    localStorage.clear();
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
      expect(localStorage.getItem('users')).not.toBeNull();
    }, { timeout: 3000 });
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    expect(users).toHaveLength(1);  
    expect(users[0].firstName).toBe('Marie');
    expect(users[0].lastName).toBe('Martin');

  });

  it('navigue vers Home après soumission réussie (2s)', async () => {
    render(<App />);
    
    await waitFor(() => screen.getByText(/Ajouter un nouvel utilisateur/i));
    
    // Remplit formulaire COMPLET
    await userEvent.type(screen.getByLabelText(/Prénom/i), 'Marie');
    await userEvent.type(screen.getByLabelText(/Nom de famille/i), 'Martin');
    await userEvent.type(screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    await userEvent.type(screen.getByLabelText(/Email/i), 'marie@test.fr');
    await userEvent.type(screen.getByLabelText(/Ville/i), 'Angers');
    await userEvent.type(screen.getByLabelText(/Code postal/i), '49100');
    
    // Soumet → déclenche handleSubmitSuccess
    await userEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));
    
    // Attend TOAST (1s)
    await waitFor(() => {
      expect(screen.getByText(/Inscription réussie/i)).toBeInTheDocument();
    });
    
    // Attend 4s
    await waitFor(() => {
      expect(screen.getByText(/Bienvenue sur votre annuaire/i)).toBeInTheDocument();
    }, { timeout: 4000 });
    
    // Vérifie localStorage + Home rendu
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    expect(users).toHaveLength(1);
    expect(users[0].firstName).toBe('Marie');
  });
});


describe('App - setUsers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('setUsers incrémente le compteur après ajout', async () => {
    render(<App />);
    
    // Compteur initial = 0
    expect(JSON.parse(localStorage.getItem('users') || '[]')).toHaveLength(0);
    
    // Va sur Register + remplit formulaire
    await userEvent.click(screen.getByRole('link', { name: /nouvelle inscription/i }));
    await waitFor(() => screen.getByText(/Ajouter un nouvel utilisateur/i));
    
    await userEvent.type(screen.getByLabelText(/Prénom/i), 'Marie');
    await userEvent.type(screen.getByLabelText(/Nom de famille/i), 'Martin');
    await userEvent.type(screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    await userEvent.type(screen.getByLabelText(/Email/i), 'marie@test.fr');
    await userEvent.type(screen.getByLabelText(/Ville/i), 'Angers');
    await userEvent.type(screen.getByLabelText(/Code postal/i), '49100');
    
    // Soumet → addUser → setUsers([...users, newUser])
    await userEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));
    
    // Attend redirection + setUsers effet (2s)
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('users') || '[]')).toHaveLength(1); 
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
