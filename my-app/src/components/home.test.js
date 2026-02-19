import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from "react-router-dom";

/**
 * @function Home
 */
describe('Home - calcul âge réel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('calcule et affiche l\'âge après inscription préalable', async () => {
    // Pré-remplit localStorage avec user 
    localStorage.setItem('users', JSON.stringify([{
      firstName: 'Marie',
      lastName: 'Martin',
      dob: '1990-01-01', 
      email: 'marie@test.fr',
      city: 'Angers',
      postalCode: '49100'
    }]));

    render(<Home />, {wrapper: BrowserRouter});
    
    // vérifie âge calculé
    await waitFor(() => {
      expect(screen.getByText('Marie')).toBeInTheDocument();
      expect(screen.getByText('36')).toBeInTheDocument();  
    });
  });

   it('calcule et affiche l\'âge après inscription préalable', async () => {
    // Pré-remplit localStorage avec user 
    localStorage.setItem('users', JSON.stringify([{
      firstName: 'Marie',
      lastName: 'Martin',
      dob: '', 
      email: 'marie@test.fr',
      city: 'Angers',
      postalCode: '49100'
    }]));

    render(<Home />, {wrapper: BrowserRouter});
    
    // vérifie âge calculé
    await waitFor(() => {
      expect(screen.getByText('Marie')).toBeInTheDocument();
      expect(screen.getByText('N/A')).toBeInTheDocument();  
    });
  });
});
