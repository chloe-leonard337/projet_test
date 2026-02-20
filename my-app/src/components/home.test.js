import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import * as api from '../api';

jest.mock('../api');
const mockGetUsers = api.GetUsers;

const mockUsers = [
  {
    id: 1,
    name: 'Marie Martin',
    email: 'marie@test.fr',
    dob: '1990-01-01',
    username: 'mariemartin',
    address: { city: 'Angers' },
    postalCode: '49100'
  }
];

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockGetUsers.mockResolvedValue({ users: mockUsers, countUsers: 1 });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('affiche le titre principal', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText('Bienvenue sur votre annuaire !')).toBeInTheDocument();
  });

  it('affiche le lien nouvelle inscription', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /nouvelle inscription/i })).toBeInTheDocument();
  });

  it('useEffect console.log(saved, saved.length)', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<MemoryRouter><Home /></MemoryRouter>);

    await waitFor(() => {
      expect(mockGetUsers).toHaveBeenCalledTimes(1);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      { users: mockUsers, countUsers: 1 },
      1
    );
    consoleSpy.mockRestore();
  });

  it('useEffect setLocalUsers + setLocalCount', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    await waitFor(() => {
      expect(screen.getByText('Liste des inscrits (1)')).toBeInTheDocument();
      expect(screen.getByText('mariemartin')).toBeInTheDocument();
    });

    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  it('setInterval toutes les 2s', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(1));
    
    jest.advanceTimersByTime(2000);
    await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(2));
    
    jest.advanceTimersByTime(2000);
    await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(3));
  });

  it('clearInterval au démontage', async () => {
    const { unmount } = render(<MemoryRouter><Home /></MemoryRouter>);

    await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(1));
    
    unmount();
    
    jest.advanceTimersByTime(4000);
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  it('calcule âge depuis dob', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    await waitFor(() => screen.getByText('Liste des inscrits (1)'));
    
    expect(screen.getByText('36')).toBeInTheDocument();
  });

  it('affiche "Aucun inscrit" si vide', async () => {
    mockGetUsers.mockResolvedValueOnce({ users: [], countUsers: 0 });
    
    render(<MemoryRouter><Home /></MemoryRouter>);
    
    expect(screen.getByText('Aucun inscrit pour le moment')).toBeInTheDocument();
  });

  it('gère erreur API', async () => {
    mockGetUsers.mockRejectedValueOnce(new Error('API down'));
    
    render(<MemoryRouter><Home /></MemoryRouter>);
    
    await waitFor(() => {
      expect(screen.getByText('Aucun inscrit pour le moment')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('tableau avec TOUS les en-têtes', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    await waitFor(() => screen.getByText('Liste des inscrits (1)'));
    
    expect(screen.getByRole('columnheader', { name: 'Pseudo' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Nom' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Âge' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Ville' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'CP' })).toBeInTheDocument();
  });

  it('map localUsers avec key=user.timestamp', async () => {
    const userWithTimestamp = {
      ...mockUsers[0],
      timestamp: Date.now()
    };
    mockGetUsers.mockResolvedValue({ users: [userWithTimestamp], countUsers: 1 });

    render(<MemoryRouter><Home /></MemoryRouter>);

    await waitFor(() => expect(screen.getByText('mariemartin')).toBeInTheDocument());
  });
});
