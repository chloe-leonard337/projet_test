import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from './Form';
import './App.css';

function App() {
  const [usersCount, setUsersCount] = useState(0);
  const [lastUser, setLastUser] = useState(null);

  const handleSubmitSuccess = (userData) => {
    setLastUser(userData);
    setUsersCount(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Formulaire d'inscription</h1>
        <p>Nombre d'inscriptions: <span data-testid="count">{usersCount}</span></p>
        {lastUser && (
          <p>Dernier inscrit: {lastUser.firstName} {lastUser.lastName}</p>
        )}
      </header>
      <Form onSubmitSuccess={handleSubmitSuccess} />

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

export default App;
