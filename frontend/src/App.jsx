import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {

  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token_pariscorp') ? true : false
  );

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ?
                <Navigate to="/home" />:
                <Login setIsAuthenticated={setIsAuthenticated} />
            }
          />
          
          <Route 
            path="/home"
            element={
              isAuthenticated ?
                <Home />:
                <Navigate to="/login" />
            }
          />

          <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
