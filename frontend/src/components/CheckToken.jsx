import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckToken = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExpiry = localStorage.getItem('token_expiry');
    if (tokenExpiry) {
      const timeRemaining = tokenExpiry - new Date().getTime();

      if (timeRemaining <= 0) {
        localStorage.removeItem('token_pariscorp');
        localStorage.removeItem('token_expiry');
        setIsAuthenticated(false);
        navigate('/login');
      } else {
        const timer = setTimeout(() => {
          localStorage.removeItem('token_pariscorp');
          localStorage.removeItem('token_expiry');
          setIsAuthenticated(false);
          navigate('/login');
        }, timeRemaining);

        return () => clearTimeout(timer);
      }
    }
  }, [navigate, setIsAuthenticated]);

  return null;
};

export default CheckToken;
