import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-router-dom';
import Form from '../Form';
import './Home.css';

function Register() {
  const navigate = useNavigate();

  const handleSubmitSuccess = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    setTimeout(() => navigate('/'), 2000); 
  };

  return (
    <div className="App">
      <header className="Home-header">
        <h1 >Ajouter un nouvel utilisateur</h1>
      </header>
      <Form onSubmitSuccess={handleSubmitSuccess} />

      <ToastContainer 
        position="top-right"
        autoClose={2000}
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
