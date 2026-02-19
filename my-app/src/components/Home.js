import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ users, userCount }) => {
  const [localUsers, setLocalUsers] = useState([]);
  const [localCount, setLocalCount] = useState(0);
// Styles pour le tableau (à ajouter en haut du composant)
const tableHeaderStyle = {
  padding: '8px 6px',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '0.75em',
  borderRight: '1px solid rgba(255,255,255,0.2)'
};

const tableCellStyle = {
  padding: '8px',
  fontSize: '0.6em',
  borderRight: '1px solid rgba(255,255,255,0.1)',
  verticalAlign: 'middle'
};

  useEffect(() => {
    const loadUsers = () => {
      const saved = JSON.parse(localStorage.getItem('users') || '[]');
      setLocalUsers(saved);
      setLocalCount(saved.length);
    };

    loadUsers();
    const interval = setInterval(loadUsers, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', loadUsers);
    };
  }, []);



  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Bienvenue sur votre annuaire !</h1>
    </header>     
        {localUsers.length > 0 ? (
        <div style={{ margin: '20px 0', overflowX: 'auto' }}>
            <h3 style={{ marginBottom: '15px', color: '#61dafb' }}>Liste des inscrits ({localCount})</h3>
            
            <table 
            style={{ 
                width: '100%', 
                borderCollapse: 'collapse', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
            >
            <thead>
                <tr style={{ background: '#61dafb', color: '#282c34' }}>
                <th style={tableHeaderStyle}>Prénom</th>
                <th style={tableHeaderStyle}>Nom</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Âge</th>
                <th style={tableHeaderStyle}>Ville</th>
                <th style={tableHeaderStyle}>CP</th>
                </tr>
            </thead>
            <tbody>
                {localUsers.map((user, index) => {
                const age = user.dob ? 
                    new Date().getFullYear() - new Date(user.dob).getFullYear() : 
                    'N/A';
                
                return (
                    <tr 
                    key={user.timestamp || index} 
                    style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.2)',
                        '&:hover': { background: 'rgba(255,255,255,0.05)' }
                    }}
                    >
                    <td style={tableCellStyle}>{user.firstName}</td>
                    <td style={tableCellStyle}>{user.lastName}</td>
                    <td style={tableCellStyle}>
                        <span style={{ fontSize: '0.9em' }}>{user.email}</span>
                    </td>
                    <td style={tableCellStyle}>{age}</td>
                    <td style={tableCellStyle}>
                        <strong>{user.city}</strong>
                    </td>
                    <td style={tableCellStyle}>{user.postalCode}</td>
                    
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
        ) : (
        <p style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
            Aucun inscrit pour le moment
        </p>
        )}

        
        <Link className='Home-button' to="/register">
          nouvelle inscription
        </Link>
        <br>
        </br>


    </div>
  );
}

export default Home;
