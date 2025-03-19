import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setIsAuthenticated}) => {
    // Agregar navigate para redireccionar
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // Estado para manejar el estado de carga y respuestas del servidor
    const [loading, setLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useState({
        success: false,
        message: ''
    });

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reiniciar estados
        setErrors({});
        setLoginStatus({ succes: false, message: '' });

        // Validación básica
        const newErrors = {};
        if (!username) newErrors.username = 'El username es requerido';
        if (!password) newErrors.password = 'La contraseña es requerida';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return
        }

        try {
            // Indicar que está cargando
            setLoading(true);
            // Realizar la petición al backend
            const response = await fetch('https://test-frontend-dev.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });

            // Procesar la respuesta
            const data = await response.json();

            if (!response.ok) {
                // Manejar errores del servidor
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setLoginStatus({ 
                        success: false, 
                        message: data.message || "Error al iniciar sesión. Intenta de nuevo."
                    });
                }
            } else {
                // Login exitoso
                setLoginStatus({ 
                    success: true, 
                    message: "Inicio de sesión exitoso!" 
                });

                // Aquí guardas el token JWT del backend
                if (data.access_token) {
                    localStorage.setItem('token_pariscorp', data.access_token);
                    localStorage.setItem('token_expiry', new Date().getTime() + 3600000);
                
                    setIsAuthenticated(true);
                    navigate('/');
                }

            }

        } catch (error) {
            setLoginStatus({
                success: false,
                message: "Error de conexión con el servidor. Verifica tu conexión a internet."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-fray-100">
            <div className="w-full max-w-md">
                <form 
                    onSubmit={handleSubmit}
                    className="bg-gray-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
                    >

                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input 
                            id="username" 
                            type="text" 
                            placeholder="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                errors.username ? "border-red-500" : ""
                            }`}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.username}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder="************" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${
                                errors.password ? "border-red-500" : ""
                            }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs italic">{errors.password}</p>
                        )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Ingresar
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default Login;