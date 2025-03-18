import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CursoCard from "./components/CursoCard";

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
                <Navigate to="/" />:
                <Login setIsAuthenticated={setIsAuthenticated} />
            }
          />
          
          <Route 
            path="/"
            element={
              isAuthenticated ?
                <Home />:
                <Navigate to="/login" />
            }
          />

          <Route 
            path="/curso/:id"
            element={
              isAuthenticated ?
                <CursoCard />:
                <Navigate to="/login" />
            }
          />

          <Route path="/*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
