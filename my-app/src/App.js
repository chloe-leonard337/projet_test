import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          <Route 
            path="/ 
            element={<Home users={users} userCount={users.length} />} 
          />
          <Route 
            path="/register" 
            element={<Register onUserAdded={addUser} />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
