import { Link, useNavigate } from "react-router-dom";

const links = [
    {
        name: "Login",
        href: "./login"
    },
    {
        name: "Home",
        href: "./"
    },
]

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    //Función para manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem('token_pariscorp');
        setIsAuthenticated(false);
        navigate('login');
    }

    return (
        <header className="bg-gray-900 text-white font-bold dark:bg-blue-900 dark:text-gray-200">
            <nav className="container mx-auto flex justify-between items-center py-4">
                {/* Logo o Título */}
                <Link to="/" className="text-xl">ParisCorp</Link>

                {/* Links de Navegación */}
                <ul className="flex space-x-4">
                    {!isAuthenticated ? (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    ): (
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link
                                    onClick={handleLogout}
                                    className="py-1 px-2 rounded"
                                >
                                    Cerrar Sesión
                                </Link>
                            </li>
                        </>

                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;