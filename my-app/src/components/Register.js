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
    const result = await PostUser(userData);

    const successMessage = result.message || 'Inscription réussie !';

    toast.success(successMessage);
    
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      console.error('Erreur inscription:', err);
      
      const errorMessage = err.message || 'Erreur inattendue';
            
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Home">
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
