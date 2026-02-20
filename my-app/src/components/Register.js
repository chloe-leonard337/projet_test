import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../Form';
import './Home.css';
import { PostUser } from '../api';

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitSuccess = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      await PostUser(userData);
      
      toast.success('Inscription réussie !');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      console.error('Erreur inscription:', err);
      
      let errorMessage = 'Une erreur est survenue';
      
      if (err.response?.status === 400) {
        errorMessage = err.response.data?.message || 'Email invalide ou déjà utilisé';
      } else if (err.response?.status === 500) {
        errorMessage = 'Erreur serveur, veuillez réessayez plus tard.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Problème de connexion. Vérifiez votre réseau.';
      } else {
        errorMessage = err.message || 'Erreur inattendue';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="Home-header">
        <h1>Ajouter un nouvel utilisateur</h1>
      </header>
      
      {error && (
        <div className="error-alert" style={{ 
          color: 'red', 
          padding: '1rem', 
          background: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          ❌ {error}
        </div>
      )}
      
      <Form 
        onSubmitSuccess={handleSubmitSuccess}
        loading={loading}
      />

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Register;
