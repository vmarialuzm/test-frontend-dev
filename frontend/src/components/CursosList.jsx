import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CursosList = () => {
    const [cursos, setCursos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token_pariscorp')

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await fetch(`https://test-frontend-dev.onrender.com/api/modulos`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los cursos')
                }
                const data = await response.json()
                setCursos(data)
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCursos();
    }, [token]);

    if (isLoading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className="text-white">
            <div className="py-4">
                <h1 className="font-bold">Fundamentos de Programación y Desarrollo Web</h1>
                <p>Conoce más sobre computación básica y pensamiento lógico y programación orientada a desarrollo web.</p>
            </div>
            
            <div className="border-1 border-solid border-sky-500 rounded-xl py-8 px-8">
                <h2 className="font-bold pb-8">Computación Básica y Pensamiento Lógico</h2>
                <ul>
                    {cursos.map((item, index) => (
                        <Link
                            to={`/curso/${index}`}
                            state={{ course: item}}
                            key={index}
                        >
                            <li className="border-1 border-solid border-sky-500 rounded-xl p-4 mb-4 bg-sky-900 hover:bg-blue-950 cursor-pointer">
                                <div>
                                    <p className="font-bold mb-2">{item.titulo}</p>
                                    <p>{item.descripcion}</p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );

};

export default CursosList;

